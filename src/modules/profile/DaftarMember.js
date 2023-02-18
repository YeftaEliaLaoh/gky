import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { softRed } from "../../constants/color";
import { createMember } from "../../config/api";
import moment from "moment";

const DaftarMember = () => {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);

  const [nomor_anggota, set_nomor_anggota] = useState("");
  const [nama_anggota, set_nama_anggota] = useState("");
  const [tanggal_lahir, set_tanggal_lahir] = useState("");
  const [alamat, set_alamat] = useState("");
  const [kode_pos, set_kode_pos] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [kelas, set_kelas] = useState("");
  const [kebaktian, set_kebaktian] = useState("1");
  const [metode_pembayaran, set_metode_pembayaran] = useState("1");

  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
    window.location.reload();
  };

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    setLang(language);
    let token = localStorage.getItem("token");
    if (token != null) {
      setToken(token);
    } else {
      logout()
    }
  }, []);

  const doDaftarMembership = () => {
    alert.removeAll()
    let new_tanggal_lahir = moment(tanggal_lahir).format("yyyy-MM-DD HH:mm:ss");
    let data = {
      nomor_anggota, nama_anggota, tanggal_lahir: new_tanggal_lahir, alamat, kode_pos, phone_number, kelas, kebaktian, metode_pembayaran
    }
    console.log(JSON.stringify(data))
    if (nomor_anggota == "" || nama_anggota == "" || tanggal_lahir == "" || alamat == "" || kode_pos == "" || phone_number == "" || kelas == "" || kebaktian == "" || metode_pembayaran == "") {
      return alert.error(l10n.all_must_required[lang])
    }

    createMember(nomor_anggota, nama_anggota, new_tanggal_lahir, alamat, kode_pos, phone_number, kelas, kebaktian, token).then((res) => {
      console.log(JSON.stringify(res.data))
      if (res.data.status == "success") {
        history.push('/bayar_member',{fromDaftarMember:true});
      } else {
        alert.info(l10n.something_wrong)
      }
    }).catch((err) => {
      if (err.response.data.status != null) {
        alert.error(err.response.data.message)
      } else {
        alert.info(l10n.something_wrong)
      }
    })


  }

  const validasiKelas = (tanggal_lahir) => {
    console.log(tanggal_lahir)
    let umur = moment().diff(moment(tanggal_lahir), 'years')
    console.log("umur " + umur)
    if(umur >= 0 && umur <= 12 ) {
      set_kelas("Anak-Anak")
    }
    if(umur >= 13 && umur <= 17 ) {
      set_kelas("Remaja")
    }
    if(umur >= 18 && umur <= 59 ) {
      set_kelas("Dewasa")
    }
    if(umur >= 60 ) {
      set_kelas("Lansia")
    }
    
    
  }


  return (
    <Container>
      <Row className="header">
        <Col md="auto" xs="auto">
          <div style={{ justifyContent: "flex-start" }}>
            <a onClick={() => history.goBack()}>
              <img src={ic_back} alt="back" style={{ width: 25, position: "relative", marginRight: 10, marginTop: -5 }} />
            </a>
            <span style={{ fontSize: 20 }}>{l10n.regis_membership[lang]}</span>
          </div>
        </Col>
      </Row><br />
      <Row>
        <Col>
          <div style={{ padding: 5, borderRadius: 10, backgroundColor: softRed }}>
            <h5 style={{ textAlign: "center", fontSize: 15 }}>{l10n.benefits_membership[lang]}</h5>
            <p style={{ textAlign: "center", fontSize: 10 }}>They will obtain  memberships (permissions) to borrow the books in GKY Pluit’s library.</p>
          </div>
          <div>
            <p>
              {l10n.please_fill_form_membership[lang]}
            </p>
            <p>{l10n.fee_membership[lang]}</p>
            <p>-/ {l10n.year[lang]} <b style={{ color: "red" }}>Rp. 20.000</b></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="auto" xs="auto">
          <div className="titleInput">{l10n.no_anggota[lang]}</div>
          <div >
            <input type={"text"} placeholder={l10n.no_anggota[lang]} value={nomor_anggota} onChange={(event) => set_nomor_anggota(event.target.value)} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.nama_anggota[lang]}</div>
          <div >
            <input type={"text"} placeholder={l10n.nama_anggota[lang]} value={nama_anggota} onChange={(event) => set_nama_anggota(event.target.value)} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.tanggal_lahir[lang]}</div>
          <div >
            <input type={"date"} style={{ backgroundColor: "white" }} placeholder={l10n.tanggal_lahir[lang]} value={tanggal_lahir} onChange={(event) => {
              validasiKelas(event.target.value)
              set_tanggal_lahir(event.target.value)
            }} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.alamat[lang]}</div>
          <div>
            <input type={"text"} placeholder={l10n.alamat[lang]} value={alamat} onChange={(event) => set_alamat(event.target.value)} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.kode_pos[lang]}</div>
          <div >
            <input type={"text"} placeholder={l10n.kode_pos[lang]} value={kode_pos} onChange={(event) => set_kode_pos(event.target.value)} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.phone_number[lang]}</div>
          <div >
            <input type={"text"} placeholder={l10n.input_phone_number[lang]} value={phone_number} onChange={(event) => set_phone_number(event.target.value)} />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.kelas[lang]}</div>
          <div >
            <input type={"text"} placeholder={l10n.kelas[lang]} value={kelas} disabled />
            <hr style={{ marginTop: 0 }} />
          </div>
          <div className="titleInput">{l10n.kebaktian[lang]}</div>
          <div>
            {/* <input type={"text"} placeholder={l10n.kebaktian[lang]} value={kebaktian} onChange={(event) => set_kebaktian(event.target.value)} /> */}
            <select style={{ border: "none", width: "100%", backgroundColor: "white" }} onChange={(event) => set_kebaktian(event.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <hr style={{ marginTop: 0 }} />
          </div>
          <div>
            <div className="titleInput">{l10n.metode_pembayaran[lang]}</div>
            <select style={{ border: "none", width: "100%", backgroundColor: "white" }} onChange={(event) => set_metode_pembayaran(event.target.value)}>
              <option value={1}>Bayar di Tempat</option>
            </select>
            <hr style={{ marginTop: 0 }} />
          </div>
          <br />
          <div className="justify-content-center align-items-center bottomArea">
            <button
              variant="primary"
              className="btnNext"
              onClick={() => doDaftarMembership()}
            >
              <div>{l10n.register[lang]}</div>
            </button>

          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default DaftarMember;