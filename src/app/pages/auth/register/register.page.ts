import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';  // Importar AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.form = this.fb.group({
      userType: ['', Validators.required], // Cliente o Vendedor
      fullName: ['', [Validators.required, Validators.minLength(3)]], // Nombre completo
      fullLastName: ['', [Validators.required, Validators.minLength(6)]], // Apellidos
      email: ['', [Validators.required, Validators.email]], // Correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+\d{1,3}\d{8,15}$/) // Teléfono con código de área (+123456789)
        ]
      ]
    });
  }

  async submit() {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);

      // Mostrar el mensaje de éxito
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: '¡Te has registrado correctamente!',
        buttons: ['OK']
      });

      await alert.present();

      // Aquí puedes añadir lógica para enviar los datos al backend
    } else {
      console.log('Formulario inválido');

      // Mostrar mensaje de error si el formulario es inválido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, revisa los campos del formulario.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
