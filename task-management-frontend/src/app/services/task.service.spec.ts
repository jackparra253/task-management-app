import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'completed' }
    ];

    service.getTasks(1).subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?page=1&pageSize=10`);
    expect(req.request.method).toBe('GET');
    req.flush({ tasks: mockTasks, totalPages: 1, currentPage: 1 });
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task', description: 'New Description', status: 'pending' };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual({ id: 1, ...newTask });
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, ...newTask });
  });
});