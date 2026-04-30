from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class Pengajuan(Base):
    __tablename__ = "pengajuan"

    id_pengajuan = Column(Integer, primary_key=True, index=True)
    jenis_pengajuan = Column(String, nullable=False)
    deskripsi = Column(Text, nullable=False)
    status = Column(String, default="pending")
    tanggal_pengajuan = Column(DateTime, default=datetime.datetime.utcnow)

    type = Column(String)

    #FK ke Mahasiswa
    id_mahasiswa = Column(Integer, ForeignKey("mahasiswa.id_user"), nullable=False)

    #FK ke Dosen 
    id_dosen = Column(Integer, ForeignKey("dosen.id_user"), nullable=False)

    __mapper_args__ = {
        "polymorphic_on": type,
        "polymorphic_identity": "pengajuan_base",
    }

    # Relationships
    pembuat = relationship("Mahasiswa", back_populates="daftar_pengajuan")
    validator = relationship("Dosen", back_populates="tugas_validasi")

    # Relasi 1-1 ke Komentar
    catatan_dosen = relationship("Komentar", back_populates="pengajuan", uselist=False)

    def getStatus(self):
        return self.status

    def ubahStatus(self, statusBaru):
        self.status = statusBaru

class Komentar(Base):
    __tablename__ = "komentar"

    id_komentar = Column(Integer, primary_key=True, index=True)
    isi_komentar = Column(Text, nullable=False)
    tanggal_komentar = Column(DateTime, default=datetime.datetime.utcnow)

    # Relasi ke Pengajuan
    id_pengajuan = Column(Integer, ForeignKey("pengajuan.id_pengajuan"), unique=True)

    # Relasionship balik ke Pengajuan
    pengajuan = relationship("Pengajuan", back_populates="catatan_dosen")

class JenisPengajuan(Pengajuan):
    __tablename__ = "jenis_pengajuan"

    id_jenis = Column(Integer, ForeignKey("pengajuan.id_pengajuan"), primary_key=True)
    nama_jenis = Column(String, nullable=False)
    deskripsi_khusus = Column(String)

    __mapper_args__ = {
        "polymorphic_identity": "jenis_pengajuan_detail",
    }

    def getJenis(self):
        return self.nama_jenis