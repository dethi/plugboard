<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $input = $request->only('email', 'password');
        if (Auth::attempt($input, false)) {
            $user = Auth::user();
            if (empty($user->api_token)) {
                $user->api_token = str_random(60);
                $user->save();
            }
            return $user->makeVisible('api_token');
        }

        return response([
            'code' => 'failed_login',
            'error' => 'Wrong email/password combination'
        ], 401);
    }
}
