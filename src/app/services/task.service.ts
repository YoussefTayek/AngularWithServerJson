import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteOne(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(task: Task) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  update(task) {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }

  completed(id, completed) {
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed});
  }
}
