from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class Notifikasi(Base): 
    __tablename__ = "notifikasi"

    id_notifikasi = Column(Integer, primary_key=True, index=True)
    pesan = Column(Text, nullable=False)
    tanggal = Column(DateTime, default=datetime.datetime.utcnow)
    status_baca = Column(Boolean, default=False)

    # FK ke User
    id_user = Column(Integer, ForeignKey("users.id_user"), nullable=False)

    #FK ke pengajuan
    id_pengajuan = Column(Integer, ForeignKey("pengajuan.id_pengajuan"), nullable=False)

    # Relationships
    penerima = relationship("User")
    pengajuan_terkait = relationship("Pengajuan")

    def kirimNotifikasi(self, pesan_teks):
        self.pesan = pesan_teks
        self.tanggal = datetime.datetime.utcnow()

    def tandaiSudahDibaca(self):
        self.status_baca = True