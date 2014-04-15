<?php

class AdmController extends \BaseController {

  protected $layout = 'layouts.master';

  /**
   * Display a listing of the resource.
   * GET /adm
   *
   * @return Response
   */
  public function index()
  {
    $this->layout->content = 'adm.index';
  }

}