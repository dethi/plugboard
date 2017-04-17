<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gravatar_url = null;
        if (Auth::check()) {
            $gravatar_url = Auth::user()->getGravatarUrl($size = 80, $imageset = 'mm', $rating = 'g');
        }
        return view('app', ['gravatar_url' => $gravatar_url]);
    }
}
