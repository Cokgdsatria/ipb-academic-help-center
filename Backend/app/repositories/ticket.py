from sqlalchemy.orm import Session, defer
from sqlalchemy import func
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketUpdateStatus 

class TicketRepository:
    @staticmethod
    def _attach_display_fields(db: Session, ticket: Ticket):
        mahasiswa = db.query(User.id_user, User.nama).filter(User.id_user == ticket.mahasiswa_id).first()
        ticket.mahasiswa_nama = mahasiswa.nama if mahasiswa else None
        return ticket

    @staticmethod
    def create_ticket(db: Session, ticket_data: TicketCreate, mahasiswa_id: str):
        new_ticket = Ticket(
            mahasiswa_id=mahasiswa_id,
            dosen_id=ticket_data.id_dosen,
            topik=str(ticket_data.id_jenis_pengajuan),  # Map id_jenis_pengajuan to topik
            subjek=ticket_data.judul,  # Map judul to subjek
            deskripsi=ticket_data.deskripsi,
            file_name=ticket_data.file_name,
            file_data=ticket_data.file_data,
            tanggal_bimbingan=ticket_data.tanggal_bimbingan,  # Save tanggal if provided
            status="PENDING"  # Default status
        )
        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)
        return new_ticket
    
    @staticmethod
    def get_tickets_by_user(db: Session, user_id: str, role: str):
        if (role or "").upper() == "DOSEN":
            tickets = db.query(Ticket).options(defer(Ticket.file_data)).filter(Ticket.dosen_id == user_id).order_by(Ticket.created_at.desc()).all()
        else:
            tickets = db.query(Ticket).options(defer(Ticket.file_data)).filter(Ticket.mahasiswa_id == user_id).order_by(Ticket.created_at.desc()).all()
        return [TicketRepository._attach_display_fields(db, ticket) for ticket in tickets]
    
    @staticmethod
    def get_ticket_by_id(db: Session, ticket_id: int):
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None
        return TicketRepository._attach_display_fields(db, ticket)
    
    @staticmethod
    def get_dashboard_stats(db: Session, user_id: str, role: str):
        if (role or "").upper() == "DOSEN":
            base_query = db.query(Ticket).filter(Ticket.dosen_id == user_id)
        else:
            base_query = db.query(Ticket).filter(Ticket.mahasiswa_id == user_id)

        total = base_query.count()
        pending = base_query.filter(Ticket.status == "PENDING").count()
        completed = base_query.filter(Ticket.status == "RESOLVED").count()
        rejected = base_query.filter(Ticket.status == "REJECTED").count()

        return {
            "total_tickets": total,
            "pending_tickets": pending,
            "completed_tickets": completed,
            "rejected_tickets": rejected
        }
    
    @staticmethod
    def update_ticket_status(db: Session, ticket_id: int, dosen_id: str, update_data: TicketUpdateStatus):
        db_ticket = db.query(Ticket).filter(
            Ticket.id == ticket_id,
            Ticket.dosen_id == dosen_id
            ).first()
        if db_ticket:
            db_ticket.status = update_data.status
            db_ticket.komentar_dosen = update_data.komentar_dosen
            db.commit()
            db.refresh(db_ticket)
        if not db_ticket:
            return None
        return TicketRepository._attach_display_fields(db, db_ticket)
