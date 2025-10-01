<?php

namespace App\Http\Controllers;


use App\Models\Course;
use App\Models\Career;
use App\Models\Teacher;
use App\Models\Lab;
use App\Models\Activity;
use App\Models\TeacherWork;
use App\Models\StudentWork;
use App\Models\Alumni;
use App\Models\Video;
class HomeController extends Controller
{
    public function index()
    {
        $course = Course::first();
        $careers = Career::all();
        $teachers = Teacher::orderBy('order')->get();
        $labs = Lab::all();
        $activities = Activity::orderByDesc('date')->get();
        $teacherWorks = TeacherWork::with('teacher')->get();
        $studentWorks = StudentWork::all();
        $alumnis = Alumni::all();
        $mainVideo = Video::where('is_main', true)->first();
        $videos = Video::all();

        return view('index', compact(
            'course', 'careers', 'teachers', 'labs', 'activities', 'teacherWorks', 'studentWorks', 'alumnis', 'mainVideo', 'videos'
        ));
    }
}
