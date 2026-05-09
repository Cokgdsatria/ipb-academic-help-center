from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db # Benar

from app.schemas.ticket import (
    TicketCreate,
    TicketResponse,
    TicketUpdateStatus,
    DashboardStats
)

from app.repositories.ticket import TicketRepository

from app.api.v1.deps import get_current_user

router = APIRouter()

# ENDPOINT: BUAT TIKET BARU 
@router.post("/", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_new_ticket(
    ticket_in: TicketCreate,
    db: Session = Depends(get_db),
    current_user: any = Depends(get_current_user)
):
    return TicketRepository.create_ticket(
        db=db,
        ticket_data=ticket_in,
        mahasiswa_id=current_user.id_user
    )

# ENDPOINT: AMBIL STATISTIK DASHBOARD
@router.get("/stats", response_model=DashboardStats)
def get_my_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: any = Depends(get_current_user)
):
    return TicketRepository.get_dashboard_stats(db=db, user_id=current_user.id_user)

# ENDPOINT: DAFTAR RIWAYAT TICKET
@router.get("/my-tickets", response_model=List[TicketResponse])
def get_all_my_tickets(
    db: Session = Depends(get_db),
    current_user: any = Depends(get_current_user)
):
    return TicketRepository.get_tickets_by_user(
        db=db,
        user_id=current_user.id_user,
        role=current_user.role
    )

#ENDPOINT: UPDATE STATUS TICKET (DOSEN)
@router.patch("/{ticket_id}/status", response_model=TicketResponse)
def update_status(
    ticket_id: int,
    update_data: TicketUpdateStatus,
    db: Session = Depends(get_db),
    current_user: any = Depends(get_current_user)
):
    if current_user.role != "DOSEN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Akses ditolak. Hanya dosen yang dapat memproses pengajuan"
        )
    
    updated_ticket = TicketRepository.update_ticket_status(
        db=db,
        ticket_id=ticket_id,
        dosen_id=current_user.id_user,
        update_data=update_data
    )

    if not updated_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tiket tidak ditemukan"
        )
    
    return updated_ticket