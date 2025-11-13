import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MallAdminService } from './MallAdmin.service';

interface MallAdmin {
  mallAdminId: number | null;
  username: string;
  email: string;
  password: string;
  loginAttempts: number;
  isActive: boolean;
  lastLoginTime: string | null;
}

@Component({
  selector: 'app-malladmin-root',
  templateUrl: './MallAdmin.component.html',
  styleUrls: ['./MallAdmin.component.scss'],
})
export class MallAdminComponent implements OnInit {
  mallAdmins: MallAdmin[] = [];
  mallAdminToUpdate: MallAdmin = {
    mallAdminId: null,
    username: '',
    email: '',
    password: '',
    loginAttempts: 0,
    isActive: false,
    lastLoginTime: null,
  };

  constructor(private mallAdminService: MallAdminService) {}

  ngOnInit(): void {
    this.getMallAdmins();
  }

  /** Fetch mall admins from backend */
  getMallAdmins(): void {
    this.mallAdminService.getMallAdmins().subscribe({
      next: (response: any) => {
        console.log('✅ Mall Admins fetched:', response);
        this.mallAdmins = response;
      },
      error: (error) => {
        console.error('❌ Error fetching mall admins:', error);
      },
    });
  }

  /** Register a new mall admin */
  registerMallAdmin(registerForm: NgForm): void {
    if (registerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('📤 Form Data:', registerForm.value);

    this.mallAdminService.registerMallAdmin(registerForm.value).subscribe({
      next: () => {
        alert('✅ Mall admin registered successfully!');
        registerForm.reset();
        this.getMallAdmins();
      },
      error: (error) => {
        console.error('❌ Error registering mall admin:', error);
        alert('Error registering mall admin. Please try again later.');
      },
    });
  }

  /** Set admin to update (opens modal) */
  editMallAdmin(mallAdmin: MallAdmin): void {
    this.mallAdminToUpdate = { ...mallAdmin };

    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /** Update mall admin */
  updateMallAdmin(): void {
    if (!this.mallAdminToUpdate.mallAdminId) {
      alert('MallAdmin ID is undefined. Cannot update mall admin.');
      return;
    }

    if (!this.mallAdminToUpdate.lastLoginTime) {
      alert('Last login time cannot be null');
      return;
    }

    console.log('🛠 Updating:', this.mallAdminToUpdate);

    this.mallAdminService.updateMallAdmin(this.mallAdminToUpdate).subscribe({
      next: () => {
        alert('✅ Mall admin updated successfully!');
        this.getMallAdmins();
      },
      error: (error) => {
        console.error('❌ Error updating mall admin:', error);
        alert('Error updating mall admin.');
      },
    });
  }

  /** Delete mall admin */
  deleteMallAdmin(mallAdminId: number): void {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    console.log('🗑 Deleting ID:', mallAdminId);

    this.mallAdminService.deleteMallAdmin(mallAdminId).subscribe({
      next: () => {
        alert('✅ Mall admin deleted.');
        this.getMallAdmins();
      },
      error: (error) => {
        console.error('❌ Error deleting mall admin:', error);
        alert('Error deleting mall admin.');
      },
    });
  }
}
