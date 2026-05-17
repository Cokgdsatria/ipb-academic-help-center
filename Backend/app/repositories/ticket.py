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
            
        mahasiswa_ids = list(set([t.mahasiswa_id for t in tickets]))
        if mahasiswa_ids:
            users = db.query(User.id_user, User.nama).filter(User.id_user.in_(mahasiswa_ids)).all()
            user_map = {u.id_user: u.nama for u in users}
            for t in tickets:
                t.mahasiswa_nama = user_map.get(t.mahasiswa_id)
        else:
            for t in tickets:
                t.mahasiswa_nama = None
                
        return tickets
    
    @staticmethod
    def get_ticket_by_id(db: Session, ticket_id: int):
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None
        return TicketRepository._attach_display_fields(db, ticket)
    
    @staticmethod
    def get_dashboard_stats(db: Session, user_id: str, role: str):
        from sqlalchemy import case
        
        if (role or "").upper() == "DOSEN":
            condition = Ticket.dosen_id == user_id
        else:
            condition = Ticket.mahasiswa_id == user_id

        stats = db.query(
            func.count(Ticket.id).label('total'),
            func.sum(case((Ticket.status == "PENDING", 1), else_=0)).label('pending'),
            func.sum(case((Ticket.status == "RESOLVED", 1), else_=0)).label('completed'),
            func.sum(case((Ticket.status == "REJECTED", 1), else_=0)).label('rejected')
        ).filter(condition).first()

        return {
            "total_tickets": int(stats.total or 0),
            "pending_tickets": int(stats.pending or 0),
            "completed_tickets": int(stats.completed or 0),
            "rejected_tickets": int(stats.rejected or 0)
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
