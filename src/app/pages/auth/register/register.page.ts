import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController // Inyectamos AlertController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      fullLastName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registro exitoso', this.registerForm.value);

      // Mostrar alerta de éxito
      await this.showAlert(
        'Registro Exitoso',
        '¡Tu cuenta ha sido creada correctamente!',
        'success'
      );

      // Redirigir después de 2 segundos
      setTimeout(() => {
        this.navCtrl.navigateForward('/home');
      }, 2000);
    } else {
      console.error('Formulario inválido');
      // Opcional: Mostrar alerta de error
      await this.showAlert(
        'Error en el formulario',
        'Por favor, revisa los campos e inténtalo nuevamente.',
        'error'
      );
    }
  }

  // Método para mostrar una alerta
  async showAlert(header: string, message: string, type: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: type === 'success' ? 'success-alert' : 'error-alert',
    });

    await alert.present();
  }
}
