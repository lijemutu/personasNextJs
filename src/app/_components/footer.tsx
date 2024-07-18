'use client';
import Container from "@/app/_components/container";
import React, { useState } from "react";
import DatePicker , { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

export function Footer() {
  const [result, setResult] = React.useState("");
  const [date, setDate] = useState(new Date());

  registerLocale("es", es);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "1f17be69-959c-47eb-b2d2-a2853f32b9d5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <footer className="border-t border-neutral-500 bg-orange-50">
      <Container>
        <div className="pt-20 ">
          <h3 className="text-8xl font-bold tracking-tighter leading-tight text-center  mb-10 lg:mb-0 lg:pr-4 ">
            ¿Por quién buscas justicia?.
          </h3>
          <div className="max-w-md mx-auto mt-8 p-6 bg-orange-50 rounded shadow-sm ">
            <form onSubmit={onSubmit}>
              <input type="checkbox" name="botcheck" className="hidden" ></input>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Correo electrónico:</label>
                <input type="text" id="name" name="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-orange-50" required></input>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre de la víctima:</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-orange-50" required></input>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Fecha del suceso:</label>
                <DatePicker selected={date} onChange={(date) => setDate(date)} showYearDropdown showMonthDropdown dateFormat="dd/MM/yyyy" locale="es" required name="fecha"/>
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block text-gray-700 font-bold mb-2">Estado:</label>
                <select id="state" name="state" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-orange-50" required>
                  <option value="no">Seleccione uno...</option>
                  <option value="Aguascalientes">Aguascalientes</option>
                  <option value="Baja California">Baja California</option>
                  <option value="Baja California Sur">Baja California Sur</option>
                  <option value="Campeche">Campeche</option>
                  <option value="Chiapas">Chiapas</option>
                  <option value="Chihuahua">Chihuahua</option>
                  <option value="CDMX">Ciudad de México</option>
                  <option value="Coahuila">Coahuila</option>
                  <option value="Colima">Colima</option>
                  <option value="Durango">Durango</option>
                  <option value="Estado de México">Estado de México</option>
                  <option value="Guanajuato">Guanajuato</option>
                  <option value="Guerrero">Guerrero</option>
                  <option value="Hidalgo">Hidalgo</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Michoacán">Michoacán</option>
                  <option value="Morelos">Morelos</option>
                  <option value="Nayarit">Nayarit</option>
                  <option value="Nuevo León">Nuevo León</option>
                  <option value="Oaxaca">Oaxaca</option>
                  <option value="Puebla">Puebla</option>
                  <option value="Querétaro">Querétaro</option>
                  <option value="Quintana Roo">Quintana Roo</option>
                  <option value="San Luis Potosí">San Luis Potosí</option>
                  <option value="Sinaloa">Sinaloa</option>
                  <option value="Sonora">Sonora</option>
                  <option value="Tabasco">Tabasco</option>
                  <option value="Tamaulipas">Tamaulipas</option>
                  <option value="Tlaxcala">Tlaxcala</option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Yucatán">Yucatán</option>
                  <option value="Zacatecas">Zacatecas</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Cuenta tu historia:</label>
                <textarea id="message" name="message" rows={8} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-orange-50" required></textarea>
                <p className="text-sm text-zinc-700">Puedes pegar enlaces de fotos, videos o artículos.</p>
              </div>
              <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline">Enviar</button>
            </form>
          </div>
        </div>
      </Container>
            <div className="text-center text-12xl xl:text-[300px] font-semibold leading-none">
              2024 ©
            </div>
            </footer>
  );
}

export default Footer;
