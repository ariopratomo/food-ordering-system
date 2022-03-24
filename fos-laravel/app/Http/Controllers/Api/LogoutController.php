<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //remove JWT token from the request
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());
        // if token is removed
        if($removeToken) {
            return response()->json([
                'success' => true,
                'message' => 'You have successfully logged out'
            ], 200);
        }
    }
}
