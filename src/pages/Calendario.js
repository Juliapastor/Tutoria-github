import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { supabase } from '../supabaseClient';
import './Calendario.css';
import Header from './Header';

Modal.setAppElement('#root');

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false); // Modal para fines de semana
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [nextAppointment, setNextAppointment] = useState(null);
  const [pastAppointmentsModalOpen, setPastAppointmentsModalOpen] = useState(false);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [name, setName] = useState("");

  const fetchPastAppointments = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.from('citas').select().lt('date', currentDate).order('date', { ascending: false });

    if (error) {
      console.error('Error al cargar citas pasadas:', error);
    } else {
      setPastAppointments(data);
      setPastAppointmentsModalOpen(true);
    }
  };

  const closePastAppointmentsModal = () => {
    setPastAppointmentsModalOpen(false);
  };

  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from('citas').select().order('date', { ascending: true });

    if (error) {
      console.error('Error al cargar citas:', error);
    } else {
      const futureAppointments = data.filter(cita => new Date(cita.date) > new Date());

      setEvents(futureAppointments.map(cita => ({
        id: cita.id,
        title: cita.title,
        start: `${cita.date}T${cita.start_time}:00`,
        end: `${cita.date}T${cita.end_time}:00`,
      })));

      if (futureAppointments.length > 0) {
        const next = futureAppointments[0];
        setNextAppointment({
          title: next.title,
          date: next.date,
          start_time: next.start_time,
        });
      } else {
        setNextAppointment(null);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Función que abre el modal y establece la fecha seleccionada al hacer clic en un día
  const handleDateClick = (info) => {
    const selectedDay = new Date(info.dateStr).getDay();

    if (selectedDay === 0 || selectedDay === 6) {
      // Si es sábado (6) o domingo (0), mostramos el modal informativo
      setInfoModalIsOpen(true);
    } else {
      // Si no es fin de semana, abre el modal para agendar una cita
      setSelectedDate(info.dateStr);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setName("");
    setEmail("");
    setSelectedTime("");
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(isValidEmail(emailValue));
  };

  const handleTimeSelect = async () => {
    const endTime = String(Number(selectedTime.split(':')[0]) + 1).padStart(2, '0') + ':00';

    const { data, error } = await supabase.from('citas').insert([
      {
        title: appointmentTitle,
        date: selectedDate,
        start_time: selectedTime,
        end_time: endTime,
        email: email,
      },
    ]);

    if (error) {
      console.error('Error al agregar cita:', error);
      setSuccessMessage('Error al guardar la cita');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setSuccessMessage('Cita elegida con éxito');
      setTimeout(() => setSuccessMessage(''), 3000);
      await fetchAppointments();
      closeModal();
    }
  };

  const handleEventClick = async (clickInfo) => {
    const eventId = clickInfo.event.id;
    if (window.confirm(`¿Deseas eliminar la cita "${clickInfo.event.title}"?`)) {
      const { error } = await supabase.from('citas').delete().eq('id', eventId);
      if (error) {
        console.error('Error al eliminar cita:', error);
      } else {
        await fetchAppointments();
      }
    }
  };

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentTime = `${currentHour}:${currentMinute < 10 ? '0' + currentMinute : currentMinute}`;


  return (
    <div className='body'>
      <Header />
      {nextAppointment ? (
        <div style={{
          fontSize: '30px',
          position: 'absolute',
          color: '#fff',        
          zIndex: 1000,
          marginLeft: '850px',
          marginTop: '40px',
          zIndex: '999'
        }}>
          <p><strong>Próxima Cita:</strong><br></br>
          {nextAppointment.date}<br></br>
          {nextAppointment.start_time} H</p>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '-30px',
          
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000,
          marginLeft: '850px',
          marginTop: '150px',
          zIndex: '999'
        }}>
          <h1>Tu próxima cita</h1>
          No tienes citas futuras
        </div>
      )}
    <div style={{ width: '60%', margin: 'auto', position: 'relative', marginTop: '180px', paddingBottom: '90px'}}>
      {successMessage && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000,
        }}>
          {successMessage}
        </div>
      )}

      
      <FullCalendar
         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
         initialView="dayGridMonth"
         selectable={true}
         editable={true}
         events={events}
         eventClick={handleEventClick}
         dateClick={handleDateClick} // Añade dateClick aquí
         weekends={true}
         validRange={{
           start: currentDateString,
         }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Seleccionar Hora"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1000',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            maxWidth: '400px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '999',
          },
        }}
      >
        <h2>Registrar nueva cita</h2>
        <p>Fecha seleccionada: {selectedDate}</p>

        <label>
          Nombre de la cita:
          <input
            type="text"
            value={appointmentTitle}
            onChange={(e) => setAppointmentTitle(e.target.value)}
            placeholder="Introduce el nombre de la cita"
            style={{ margin: '10px 0', padding: '5px', width: '100%' }}
          />
        </label>

        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Introduce tu correo electrónico"
            style={{ margin: '10px 0', padding: '5px', width: '100%' }}
          />
        </label>
        {!isEmailValid && (
          <p style={{ color: 'red' }}>Por favor, introduce un correo electrónico válido.</p>
        )}

        <div>
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={events.some(event => event.start === `${selectedDate}T${time}:00`) || (selectedDate === currentDateString && time < currentTime)}
              style={{
                margin: '5px',
                padding: '10px',
                backgroundColor: selectedTime === time ? '#007bff' : '#f0f0f0',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {time}
            </button>
          ))}
        </div>

        <button onClick={handleTimeSelect} disabled={!selectedTime || !appointmentTitle || !email || !isEmailValid} style={{ marginTop: '10px' }}>
          Confirmar Cita
        </button>
        <button onClick={closeModal} style={{ marginTop: '10px', marginLeft: '10px' }}>
          Cancelar
        </button>
      </Modal>



      <Modal
          isOpen={infoModalIsOpen}
          onRequestClose={closeInfoModal}
        contentLabel="Fin de semana"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1000',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            maxWidth: '400px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '999',
          },
        }}
        >
          <h2>Información</h2>
          <p>No se pueden seleccionar fechas en fin de semana.</p>
          <button onClick={closeInfoModal}>Cerrar</button>
        </Modal>
    </div>
    
      
      <button
        onClick={fetchPastAppointments}
        style={{
          fontSize: '20px',
          marginTop: '-50px',
          marginBottom:'60px',
          padding: '10px 20px',
          backgroundColor: '#134c8f',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Ver citas pasadas
      </button>

      
      <Modal
        isOpen={pastAppointmentsModalOpen}
        onRequestClose={closePastAppointmentsModal}
        contentLabel="Citas Pasadas"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1000',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            maxWidth: '400px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '999',
          },
        }}
      >
        <h2>Citas Pasadas</h2>
        {pastAppointments.length > 0 ? (
          <ul>
            {pastAppointments.map((cita) => (
              <li key={cita.id}>
                <p><strong>{cita.title}</strong></p>
                <p>Fecha: {cita.date}</p>
                <p>Hora: {cita.start_time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay citas pasadas</p>
        )}
        <button
          onClick={closePastAppointmentsModal}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cerrar
        </button>
      </Modal>
    </div>
    
  );
};

export default Calendario;
