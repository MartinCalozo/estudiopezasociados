<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = htmlspecialchars($_POST["nombre"]);
  $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
  $mensaje = htmlspecialchars($_POST["mensaje"]);

  if ($email) {
    $destinatario = "tu-correo@ejemplo.com"; // <--- Cambiar por tu email real
    $asunto = "Consulta desde el sitio web";
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Correo: $email\n\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    $headers = "From: $email";

    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
      echo "Mensaje enviado correctamente.";
    } else {
      echo "Error al enviar el mensaje.";
    }
  } else {
    echo "Correo no válido.";
  }
} else {
  echo "Acceso no permitido.";
}
?>
