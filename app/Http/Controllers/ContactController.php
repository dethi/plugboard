<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('contact');
    }

    /**
     * @param ContactFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function post(ContactFormRequest $request)
    {
        $data = $request->all();

        $contactUsAddress = "contact@plugboard.xyz";

        Mail::to($contactUsAddress)->send(new ContactMail($data));

        return redirect()->route('contact')->with('message', 'Message sent');
    }
}
