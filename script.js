/* Metodo Raiz - interacciones + i18n */

// ============================================
// TRADUCCIONES
// ============================================
const translations = {
  es: {
    nav_how: 'Cómo funciona',
    nav_plans: 'Planes',
    nav_trainer: 'Entrenador',
    nav_stories: 'Historias',
    nav_cta: 'Primera clase gratis',
    hero_title: 'Empezá a entrenar <em>sin</em> sentirte fuera de lugar.',
    hero_lead: 'Grupos de máximo 6 personas, un entrenador que te mira a los ojos y un plan pensado para quien recién arranca. Nada de gritos, nada de pesos imposibles.',
    hero_cta: 'Reservar clase gratis',
    hero_wa: 'Preguntá por WhatsApp',
    proof_1: 'personas arrancaron acá',
    proof_2: 'personas máximo por clase',
    proof_3_num: '1ra clase',
    proof_3: '100% gratis',
    card_tag: 'Hoy · 7:00 AM',
    card_title: 'Funcional para principiantes',
    card_meta: 'Quedan 2 lugares',
    card_sub: 'Movilidad & recuperación',
    mq_1: 'Primera clase gratis', mq_1b: 'Primera clase gratis',
    mq_2: 'Grupos de 6 personas', mq_2b: 'Grupos de 6 personas',
    mq_3: 'Sin experiencia previa', mq_3b: 'Sin experiencia previa',
    mq_5: 'Entrenamiento funcional', mq_5b: 'Entrenamiento funcional',
    how_eyebrow: 'Empezar es fácil',
    how_title: 'Tres pasos. <em>Cero</em> vueltas.',
    step1_title: 'Reservás tu clase gratis',
    step1_desc: 'Completás el formulario en 60 segundos. Te confirmamos por WhatsApp ese mismo día.',
    step2_title: 'Venís y entrenás',
    step2_desc: 'Mateo adapta cada ejercicio a tu nivel. Si hace años que no entrenás, perfecto — empezamos por ahí.',
    step3_title: 'Seguís si querés',
    step3_desc: 'Clase suelta, pack de 8 o membresía mensual. Sin contratos ni letra chica. Vos elegís.',
    plans_eyebrow: 'Planes',
    plans_title: 'Sin contratos. <em>Sin presión.</em>',
    plan1_name: 'Clase suelta',
    plan1_sub: 'Probá una vez, sin comprometerte.',
    plan1_per: '/clase',
    plan1_f1: '1 clase funcional',
    plan1_f2: 'Grupo de máximo 6',
    plan1_f3: 'Evaluación inicial incluida',
    plan1_cta: 'Quiero esta clase',
    plan2_flag: 'Más elegido',
    plan2_name: 'Pack 8 clases',
    plan2_sub: 'El punto ideal para crear el hábito.',
    plan2_f1: '8 clases funcionales',
    plan2_f2: 'Válido por 5 semanas',
    plan2_f3: 'Seguimiento personalizado',
    plan2_f4: 'Sesión de movilidad incluida',
    plan2_cta: 'Empezar con el pack',
    plan3_name: 'Membresía mensual',
    plan3_sub: 'Clases ilimitadas. El precio más bajo por clase.',
    plan3_per: '/mes',
    plan3_f1: 'Clases ilimitadas',
    plan3_f2: 'Prioridad en horarios',
    plan3_f3: 'Plan de progreso mensual',
    plan3_cta: 'Quiero la membresía',
    badge_label: 'Certificado',
    trainer_eyebrow: 'Tu entrenador',
    trainer_title: 'Hola, soy <em>Mateo</em>.',
    trainer_p1: 'Llevo <strong>12 años</strong> trabajando con personas que nunca habían entrenado — o que lo intentaron y lo dejaron. La mayoría llega con miedo. Casi todos siguen después de la primera clase.',
    trainer_p2: 'Creé Método Raíz porque los gimnasios grandes te pierden entre la gente. Acá somos pocos, te conozco por tu nombre, sé cómo te movés y ajusto cada clase para que progresés de verdad.',
    stat_1: 'años de experiencia',
    stat_2: 'alumnos desde cero',
    stat_3: 'personas por clase',
    testi_eyebrow: 'Lo que dicen',
    testi_title: 'Gente que también <em>arrancó de cero</em>.',
    testi_1: '"Llegué sin haber entrenado nunca. A las tres semanas ya tenía rutina y me sentía con energía todo el día. Mateo hace que sea fácil."',
    testi_2: '"Probé gimnasios grandes y siempre los dejaba. Acá somos pocos y se nota. Me acuerdan del nombre, corrigen postura. Es completamente diferente."',
    testi_3: '"Tenía miedo de lesionarme. Empezamos despacio, con movilidad. Hoy entreno cosas que hace un año no me hubiera imaginado."',
    reserve_eyebrow: 'Tu primera clase',
    reserve_title: 'Reservá <em>gratis</em> ahora.',
    reserve_desc: 'Completá el formulario y te confirmamos el horario por WhatsApp hoy mismo. Sin tarjeta, sin compromiso de ningún tipo.',
    info_hours_label: 'Horarios',
    info_hours: 'Lun a Sáb · 6–10 AM y 5–9 PM',
    info_address_label: 'Dirección',
    info_wa_label: '¿Preferís escribir primero?',
    info_wa_link: 'Escribinos por WhatsApp →',
    form_name: 'Nombre',
    form_name_ph: 'Cómo te llamás',
    form_phone: 'WhatsApp',
    form_time: '¿Cuándo querés venir?',
    form_time_ph: 'Elegí un horario',
    form_time_am: 'Mañana (6–10 AM)',
    form_time_pm: 'Tarde (5–9 PM)',
    form_time_any: 'Me da igual',
    form_level: '¿Entrenás actualmente?',
    form_level_1: 'No, nunca entrené',
    form_level_2: 'Entrenaba, hace tiempo que no',
    form_level_3: 'De vez en cuando',
    form_level_4: 'Sí, entreno regularmente',
    form_submit: 'Reservar mi clase gratis →',
    form_note: 'Te respondemos por WhatsApp en menos de 2 horas.',
    form_sending: 'Enviando...',
    msg_success: (name) => `<strong>¡Listo, ${name}!</strong> Te mandamos un mail de confirmación. Revisalo para ver los detalles de tu clase.`,
    msg_duplicate: (phone) => `<strong>Ya reservaste tu clase de prueba.</strong> Te contactamos pronto al ${phone}. Si no recibiste nada, escribinos por <a href="https://wa.me/13055550000" style="color: inherit; text-decoration: underline;">WhatsApp</a>.`,
    msg_error: '<strong>Ups.</strong> No pudimos enviar la reserva. Probá escribirnos por <a href="https://wa.me/13055550000" style="color: inherit; text-decoration: underline;">WhatsApp</a>.',
    footer: '© 2026 Método Raíz. Hecho con paciencia.',
  },

  en: {
    nav_how: 'How it works',
    nav_plans: 'Plans',
    nav_trainer: 'Trainer',
    nav_stories: 'Stories',
    nav_cta: 'Free trial class',
    hero_title: 'Start training <em>without</em> feeling out of place.',
    hero_lead: 'Groups of 6 max, a trainer who actually pays attention, and a plan designed for beginners. No yelling, no impossible weights.',
    hero_cta: 'Book your free class',
    hero_wa: 'Ask on WhatsApp',
    proof_1: 'people started here',
    proof_2: 'people max per class',
    proof_3_num: '1st class',
    proof_3: '100% free',
    card_tag: 'Today · 7:00 AM',
    card_title: 'Functional for beginners',
    card_meta: '2 spots left',
    card_sub: 'Mobility & recovery',
    mq_1: 'First class free', mq_1b: 'First class free',
    mq_2: 'Groups of 6', mq_2b: 'Groups of 6',
    mq_3: 'No experience needed', mq_3b: 'No experience needed',
    mq_5: 'Functional training', mq_5b: 'Functional training',
    how_eyebrow: 'Starting is easy',
    how_title: 'Three steps. <em>Zero</em> hassle.',
    step1_title: 'Book your free class',
    step1_desc: 'Fill out the form in 60 seconds. We confirm via WhatsApp the same day.',
    step2_title: 'Show up and train',
    step2_desc: 'Mateo adapts every exercise to your level. If it\'s been years, perfect — that\'s exactly where we start.',
    step3_title: 'Continue if you want',
    step3_desc: 'Single class, 8-class pack, or monthly membership. No contracts, no fine print. You decide.',
    plans_eyebrow: 'Plans',
    plans_title: 'No contracts. <em>No pressure.</em>',
    plan1_name: 'Single class',
    plan1_sub: 'Try once, no commitment.',
    plan1_per: '/class',
    plan1_f1: '1 functional class',
    plan1_f2: 'Group of 6 max',
    plan1_f3: 'Initial assessment included',
    plan1_cta: 'I want this class',
    plan2_flag: 'Most popular',
    plan2_name: '8-class pack',
    plan2_sub: 'The sweet spot to build the habit.',
    plan2_f1: '8 functional classes',
    plan2_f2: 'Valid for 5 weeks',
    plan2_f3: 'Personalized follow-up',
    plan2_f4: 'Mobility session included',
    plan2_cta: 'Start with the pack',
    plan3_name: 'Monthly membership',
    plan3_sub: 'Unlimited classes. Lowest cost per class.',
    plan3_per: '/month',
    plan3_f1: 'Unlimited classes',
    plan3_f2: 'Priority access to schedules',
    plan3_f3: 'Monthly progress plan',
    plan3_cta: 'I want the membership',
    badge_label: 'Certified',
    trainer_eyebrow: 'Your trainer',
    trainer_title: 'Hi, I\'m <em>Mateo</em>.',
    trainer_p1: 'I\'ve spent <strong>12 years</strong> working with people who\'d never trained before — or who tried and quit. Most arrive nervous. Almost all of them come back after the first class.',
    trainer_p2: 'I built Método Raíz because big gyms lose you in the crowd. Here I know your name, I know how you move, and I adjust every class so you actually make progress.',
    stat_1: 'years experience',
    stat_2: 'beginners coached',
    stat_3: 'people per class',
    testi_eyebrow: 'What they say',
    testi_title: 'People who also <em>started from zero</em>.',
    testi_1: '"I came in having never trained before. Three weeks in, I had a routine and felt energized all day. Mateo makes it easy."',
    testi_2: '"I tried big gyms and always quit. Here we\'re few and it shows. They remember my name, correct my posture. It\'s completely different."',
    testi_3: '"I was afraid of getting hurt. We started slow, with mobility. Today I do things I couldn\'t have imagined a year ago."',
    reserve_eyebrow: 'Your first class',
    reserve_title: 'Book for <em>free</em> right now.',
    reserve_desc: 'Fill out the form and we\'ll confirm your schedule via WhatsApp today. No card, no commitment of any kind.',
    info_hours_label: 'Hours',
    info_hours: 'Mon to Sat · 6–10 AM & 5–9 PM',
    info_address_label: 'Location',
    info_wa_label: 'Prefer to write first?',
    info_wa_link: 'Message us on WhatsApp →',
    form_name: 'Name',
    form_name_ph: 'Your name',
    form_phone: 'WhatsApp',
    form_time: 'When do you want to come?',
    form_time_ph: 'Choose a time',
    form_time_am: 'Morning (6–10 AM)',
    form_time_pm: 'Afternoon (5–9 PM)',
    form_time_any: 'No preference',
    form_level: 'Do you currently train?',
    form_level_1: 'No, never trained',
    form_level_2: 'Used to, not anymore',
    form_level_3: 'Occasionally',
    form_level_4: 'Yes, I train regularly',
    form_submit: 'Book my free class →',
    form_note: 'We reply on WhatsApp in under 2 hours.',
    form_sending: 'Sending...',
    msg_success: (name) => `<strong>Done, ${name}!</strong> We sent you a confirmation email. Check it for your class details.`,
    msg_duplicate: (phone) => `<strong>You already booked your trial class.</strong> We'll reach out soon at ${phone}. If you haven't heard from us, write us on <a href="https://wa.me/13055550000" style="color: inherit; text-decoration: underline;">WhatsApp</a>.`,
    msg_error: '<strong>Oops.</strong> We couldn\'t send your booking. Try messaging us on <a href="https://wa.me/13055550000" style="color: inherit; text-decoration: underline;">WhatsApp</a>.',
    footer: '© 2026 Método Raíz. Made with patience.',
  }
};

// ============================================
// SISTEMA DE IDIOMA
// ============================================
let currentLang = 'es';

function detectLanguage() {
  const saved = localStorage.getItem('lang');
  if (saved && translations[saved]) return saved;
  const browserLang = navigator.language || navigator.userLanguage || 'es';
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
}

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = lang === 'es' ? 'EN' : 'ES';

  const idiomaField = document.getElementById('idioma');
  if (idiomaField) idiomaField.value = lang;

  localStorage.setItem('lang', lang);
}

function toggleLanguage() {
  applyLanguage(currentLang === 'es' ? 'en' : 'es');
}

applyLanguage(detectLanguage());

const langToggle = document.getElementById('langToggle');
if (langToggle) langToggle.addEventListener('click', toggleLanguage);

// ===== Navbar scroll state =====
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-visual, .step, .plan, .trainer-photo, .trainer-copy, .testi, .reserve-copy, .reserve-form, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => io.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in'));
}

// ===== Smooth anchor offset =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================
// FORMULARIO CON BACKEND REAL
// ============================================
const API_URL = 'https://metodo-raiz.onrender.com/api/reservar';

const form = document.getElementById('reserveForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const t = translations[currentLang];
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t.form_sending;

    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      horario: document.getElementById('horario').value,
      nivel: document.getElementById('nivel').value,
      idioma: currentLang
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        if (result.error === 'duplicado') {
          success.hidden = false;
          success.style.background = '#fef3cd';
          success.style.color = '#856404';
          success.innerHTML = t.msg_duplicate(data.telefono);
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        throw new Error(result.error || 'Error');
      }

      success.hidden = false;
      success.style.background = '';
      success.style.color = '';
      success.innerHTML = t.msg_success(data.nombre.split(' ')[0]);
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (err) {
      console.error('Error:', err);
      success.hidden = false;
      success.style.background = '#f4d4cc';
      success.style.color = '#c86b4a';
      success.innerHTML = t.msg_error;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
