import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Creación del formulario con los campos email y confirmEmail
    this.forgotPasswordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
      },
      {
        // Agregamos la validación personalizada
        validator: this.matchEmails('email', 'confirmEmail'),
      }
    );
  }

  // Validación personalizada para comparar los campos email y confirmEmail
  matchEmails(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.get(email);
      const confirmEmailControl = formGroup.get(confirmEmail);

      if (confirmEmailControl?.errors && !confirmEmailControl.errors['emailMismatch']) {
        return; // Salimos si ya hay otros errores
      }

      // Comprobamos si los valores coinciden
      if (emailControl?.value !== confirmEmailControl?.value) {
        confirmEmailControl?.setErrors({ emailMismatch: true });
      } else {
        confirmEmailControl?.setErrors(null);
      }
    };
  }

  // Método para enviar el formulario
  async onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Correo de recuperación enviado a:', this.forgotPasswordForm.value.email);
      await this.showSuccessAlert();
      this.navCtrl.navigateBack('/login');
    } else {
      console.error('Formulario inválido');
    }
  }

  // Método para mostrar un mensaje de éxito
  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Correo de recuperación enviado correctamente.',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
