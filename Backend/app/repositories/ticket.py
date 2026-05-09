from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdateStatus 

class TicketRepository:

    @staticmethod
    def create_ticket(db: Session, ticket_data: TicketCreate, mahasiswa_id: str):
        new_ticket = Ticket(
            mahasiswa_id=mahasiswa_id,
            dosen_id=ticket_data.id_dosen,
            topik=str(ticket_data.id_jenis_pengajuan),  # Map id_jenis_pengajuan to topik
            subjek=ticket_data.judul,  # Map judul to subjek
            deskripsi=ticket_data.deskripsi,
            tanggal_bimbingan=ticket_data.tanggal_bimbingan,  # Save tanggal if provided
            status="PENDING"  # Default status
        )
        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)
        return new_ticket
    
    @staticmethod
    def get_tickets_by_user(db: Session, user_id: str, role: str):
        if role == "DOSEN":
            return db.query(Ticket).filter(Ticket.dosen_id == user_id).order_by(Ticket.created_at.desc()).all()
        return db.query(Ticket).filter(Ticket.mahasiswa_id == user_id).order_by(Ticket.created_at.desc()).all()
    
    @staticmethod
    def get_dashboard_stats(db: Session, user_id: str):
        
        total = db.query(Ticket).filter(Ticket.mahasiswa_id == user_id).count()

        #Berdasarkan status
        pending = db.query(Ticket).filter(Ticket.mahasiswa_id == user_id, Ticket.status == "PENDING").count()
        completed = db.query(Ticket).filter(Ticket.mahasiswa_id == user_id, Ticket.status == "RESOLVED").count()
        rejected = db.query(Ticket).filter(Ticket.mahasiswa_id == user_id, Ticket.status == "REJECTED").count()

        return {
            "total_tickets": total,
            "pending_tickets": pending,
            "completed_tickets": completed,
            "rejected_tickets": rejected
        }
    
    @staticmethod
    def update_ticket_status(db: Session, ticket_id: int, update_data: TicketUpdateStatus):
        db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if db_ticket:
            db_ticket.status = update_data.status
            db_ticket.komentar_dosen = update_data.komentar_dosen
            db.commit()
            db.refresh(db_ticket)
        return db_ticket