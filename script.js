
// SECTION OF SUKU BUNGA
let jenisSukuBunga = document.getElementById("jenis-suku-bunga");
// FORM
let inputUser = document.getElementById("tabungan-awal");
let sukuBunga = document.getElementById("suku-bunga");
let periode = document.getElementById("periode-ke");
let waktuBunga = document.getElementById("waktuBunga");
let waktuPeriode = document.getElementById("waktuPeriode");
let hasil = document.getElementById("hasil");

let modal = document.getElementById("modal");

// Memformat isi inputtan agar mengikuti format rupiah
function formatRupiah(e) {
  let value = e.value.replace(/\D/g, ""); // Menghilangkan karakter selain angka
  let formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);
  e.value = formattedValue.replace("Rp", "Rp "); // Menambahkan spasi setelah "Rp"
}

function tampil() {
  let valueSukuBunga = jenisSukuBunga.value;

    let tabunganAwal = parseFloat(inputUser.value.replace(/\D/g, ""));
    let bunga = parseFloat(sukuBunga.value);
    let waktu = parseFloat(periode.value);
    let optionBunga = waktuBunga.value;
    let optionPeriode = waktuPeriode.value;

    if (isNaN(tabunganAwal) || isNaN(bunga) || isNaN(waktu) || valueSukuBunga === "" || tabunganAwal < 0 || bunga < 0 || waktu < 0 || optionBunga === "" || optionPeriode === "") {
      setTimeout(() => { 
        modal.classList.remove("opacity-0");
        modal.classList.add("opacity-100");
      }, 100);
      setTimeout(() => {
        modal.classList.remove("-translate-y-[100%]");
        modal.classList.add("translate-y-0");
      }, 300);
    } 
    else {
      modal.classList.remove("opacity-100");
      modal.classList.add("opacity-0");
      hasil.classList.remove("hidden");
      hasil.classList.add("block");

      let rumus = 0;
      let rumusAkhir = 0;
      let besarBunga = 0;

      // Jika bunga dihitung per tahun
      if (optionBunga === "tahun") {
        if (optionPeriode === "bulan") { waktu = waktu / 12; }
      } 
      else if (optionBunga === "bulan") {
        if (optionPeriode === "tahun") { waktu = waktu * 12; }
      }

      if (valueSukuBunga === "tunggal") {
        rumus = bunga / 100 * tabunganAwal * waktu;
        besarBunga = rumus;
        rumusAkhir = rumus + tabunganAwal;
      } 
      else if (valueSukuBunga === "majemuk") {
        if (optionBunga === "tahun") {
          rumus = tabunganAwal * (1 + bunga / 100) ** waktu;
        } else if (optionBunga === "bulan") {
          rumus = tabunganAwal * (1 + bunga / 100) ** (waktu * 12);
        }
        besarBunga = rumus - tabunganAwal;
        rumusAkhir = rumus;
       }

        let formattedBunga = besarBunga.toLocaleString("id-ID", {style: "currency",currency: "IDR",});
        let formattedUang = tabunganAwal.toLocaleString("id-ID", {style: "currency",currency: "IDR",});
        let formattedIndo = rumusAkhir.toLocaleString("id-ID", {style: "currency",currency: "IDR",});

        hasil.innerHTML = `
        <div class="flex flex-col items-start">
          <p>Besar Uang : <span class= "font-semibold">Rp. ${formattedUang}</span> </p>
          <p>Bunga : <span class= "font-semibold">${bunga} </span> % /<span class= "font-semibold"> ${optionBunga} </span></p>
          <p>Periode : <span class= "font-semibold ">${periode.value}</span> / <span class= "font-semibold ">${optionPeriode}</span> </p>
          <p class="w-full text-center bg-[#101110] rounded-md py-2 px-3 mt-3">Besar Bunga : <span class= "font-semibold">${formattedBunga}</span></p>
          <p class="w-full text-center bg-[#101110] rounded-md py-2 px-3 mt-3">Total Tabungan : <span class= "font-semibold">${formattedIndo}</span></p>
        </div>
        `;
    }
}