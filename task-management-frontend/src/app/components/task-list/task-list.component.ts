import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  currentPage = 1;
  totalPages = 1;
  status = '';
  sortBy = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.currentPage, this.status, this.sortBy).subscribe(
      (response: any) => {
        this.tasks = response.tasks;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTasks();
  }

  onStatusChange(status: string) {
    this.status = status;
    this.currentPage = 1;
    this.loadTasks();
  }

  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.loadTasks();
  }
}