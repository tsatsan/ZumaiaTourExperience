import nodemailer from 'nodemailer';
module.exports = (formulario) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'jordicostafigueras@gmail.com', // Cambialo por tu email
            pass: 'Zumaia77' // Cambialo por tu password
        }
     });
    const mailOptions = {
        from: formulario.nombre,
        to: 'jordicostafigueras@gmail.com', // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
            <strong>Nombre:</strong> ${formulario.nombre} <br/>
            <strong>E-mail:</strong> ${formulario.email} <br/>
            <strong>Mensaje:</strong> ${formulario.mensaje}
            `
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err)
        }else{
        console.log(info);
        }
    });

}
