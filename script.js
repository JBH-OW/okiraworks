document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Captura de datos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono") ? document.getElementById("telefono").value.trim() : "";
    const mensaje = document.getElementById("mensaje").value.trim();
    const fechaHora = new Date().toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const pageUrl = window.location.href;
    const userAgent = navigator.userAgent;

    // Construir payload simple para evitar preflight (x-www-form-urlencoded)
    const data = new URLSearchParams();
    data.append("nombre", nombre);
    data.append("email", email);
    data.append("telefono", telefono);
    data.append("mensaje", mensaje);
    data.append("fechaHora", fechaHora);
    data.append("page_url", pageUrl);
    data.append("user_agent", userAgent);

    // Reset del mensaje
    formMessage.className = "form-message hidden";
    formMessage.textContent = "";

    try {
      const response = await fetch("https://n8n.srv902914.hstgr.cloud/webhook/okiraworks/form-web", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });

      if (response.ok) {
        formMessage.textContent =
          "✅ Gracias, hemos recibido tu consulta. Te responderemos en menos de 24h.";
        formMessage.className = "form-message success";
        form.reset();
        formMessage.scrollIntoView({ behavior: "smooth" });
      } else {
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.error("Error:", error);
      formMessage.textContent =
        "❌ Hubo un problema al enviar tu mensaje. Por favor, inténtalo más tarde.";
      formMessage.className = "form-message error";
      formMessage.scrollIntoView({ behavior: "smooth" });
    }
  });
});
