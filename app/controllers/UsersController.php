<?php

class UsersController extends \BaseController {

  protected $layout = 'layouts.master';

  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $rules = array(
      'login_name' => 'required|unique:users,login_name|min:7',
      'password' => 'required|min:8',
      'email' => 'required|email'
    );

    $validator = Validator::make(Input::all(), $rules);
    if($validator->passes()) {
      $user = new User;
      $user->login_name = Input::get('login_name');
      $user->email = Input::get('email');
      $user->password = Hash::make(Input::get('password'));

      if($user->save())
        return Response::json(array('success' => 1));
    }

    return Response::json($validator->errors());
  }

  public function auth ()
  {
    if(Auth::attempt(Input::all()))
      return Redirect::to('/');
    else
      return Redirect::guest();
  }

}