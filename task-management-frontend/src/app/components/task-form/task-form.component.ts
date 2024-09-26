import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      dueDate: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number) {
    this.taskService.getTask(id).subscribe(
      (task) => {
        this.taskForm.patchValue(task);
      },
      (error) => {
        console.error('Error loading task', error);
      }
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(
          () => {
            this.router.navigate(['/tasks']);
          },
          (error) => {
            console.error('Error updating task', error);
          }
        );
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(
          () => {
            this.router.navigate(['/tasks']);
          },
          (error) => {
            console.error('Error creating task', error);
          }
        );
      }
    }
  }
}