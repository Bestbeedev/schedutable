<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UniversityController;
use App\Http\Controllers\Api\AcademicYearController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\NotificationController;
use Illuminate\Http\Request;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



// Middleware auth:sanctum pour sécuriser les endpoints
Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('universities', UniversityController::class);
    Route::apiResource('academic-years', AcademicYearController::class);
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('notifications', NotificationController::class);

});


