<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\SendMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function verify(Request $request)
    {
        try {

            $v = Validator::make($request->all(), [
                'email' => 'required|email'
            ]);
            if ($v->fails()) {
                return response()->json(['status' => false, 'message' => $v->messages()]);
            }

            $rand = rand(11111, 99999);
            $check = User::where('email', $request->email)->count();

            Mail::to($request->email)->send(new SendMail($rand));


            if ($check == 0) {
                $user = User::create([
                    'email' => $request->email,
                    'password' => $rand
                ]);
                return response()->json(['status' => true], 200);
            } else {
                $user = User::where('email', $request->email)->first();
                $user->password = $rand;
                $user->save();
            }
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => false, 'error' => $th->getMessage()], 200);
        }
    }

    public function authenticate(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email',
            'verifyCode' => 'required'
        ]);
        if ($v->fails()) {
            return response()->json(['status' => false, 'message' => $v->messages()]);
        }

        $email = $request->email;
        $password = $request->verifyCode;

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'user not created']);
        }
        if (!Hash::check($request->verifyCode, $user->password)) {
            return response()->json(['status' => false, 'message' => 'password does not match']);
        };

        $clientSecret = DB::table('oauth_clients')->where('id', 2)->value('secret');
        $response = Http::asForm()->post('http://127.0.0.1:8001/oauth/token', [
            'grant_type' => 'password',
            'client_id' => '2',
            'client_secret' => $clientSecret,
            'username' => $email,
            'password' => $password,
            'scope' => '',
        ]);
        return $response->getBody();
    }
}
