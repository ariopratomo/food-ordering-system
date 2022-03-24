<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // set validator
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        // credentials
        $credentials = $request->only('email', 'password');

        // if JWT auth fails
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password is invalid'
            ], 401);
        }

        //  if JWT auth succeeds
        return response()->json([
            'success' => true,
            'user' => auth()->user(),
            'token' => $token
        ],200);


    }
}
