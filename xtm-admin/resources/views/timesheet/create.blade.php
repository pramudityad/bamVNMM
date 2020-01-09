@extends('layouts.app')

@section('content')
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Timesheet Submission</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Timesheet</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Timesheet</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <h3>It is currently <span class="badge badge-pill badge-primary">Week <b>{{ $current_week }}</b></span> of year <span class="badge badge-pill badge-info"><b>{{ $current_year }}</b></span></h3>
                        <br>
                        <form class="form-horizontal" action="" method="post">
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Date Range</label>
                                <div class="col-md-9">
                                    <!-- <input class="form-control" id="date-range"> -->
                                    <select class="form-control" id="date-range">
                                    </select>
                                    <span class="help-block">Please define date range for this timesheet report. <span class="text-danger"><b>Mandatory</b></span></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">First Signatory</label>
                                <div class="col-md-9">
                                    <select class="form-control" id="first-signatory">
                                    </select>
                                    <span class="help-block">Please assign the <b>First</b> Signatory. It is <span class="text-danger"><b>Mandatory</b></span></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Second Signatory</label>
                                <div class="col-md-9">
                                    <select class="form-control" id="second-signatory">
                                    </select>
                                    <span class="help-block">Please assign the <b>Second</b> Signatory. It is <span class="text-danger"><b>Mandatory</b></span></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Comments</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" id="comment"></textarea><span class="help-block">You can add additional comments for this timesheet as you see fit. It is <b>Optional</b></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <button class="btn btn-primary" type="button" id="submit"> Submit</button>
                        <button class="btn btn-light" type="button" id="reset"> Reset</button>
                    </div>
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
    <!-- /.content -->

    <div class="modal fade" id="modal-lg">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">You are submitting this Timesheet <span></span></h4>
                    <h4 class="text-center">Is the detail correct?</h4>
                    <br>
                    <!-- <div class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 col-form-label">First Signatory</label>
                            <div class="col-md-9">
                                <input disabled></input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 col-form-label">Second Signatory</label>
                            <div class="col-md-9">
                                <input disabled></input>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="float-left btn btn-info" data-dismiss="modal" id="accept">Yes</button>
                    <button type="button" class="float-right btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</div>
<!-- Scripts -->
<script>
    $(document).ready(function() {

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        let csrf_token = $('meta[name="csrf-token"]').attr('content');
        
        $(document).on('click', '#reset', function() {

            // $('select').prop('selectedIndex', 0);

            $('#date-range').val('');
            $('#date-range').text('');

            $('#first-signatory').val('');
            $('#first-signatory').text('');

            $('#second-signatory').val('');
            $('#second-signatory').text('');
            
            $('textarea').val('');

        })

        $(document).on('click', '#submit', function(click) {
            
            click.preventDefault();

            $('#modal-lg').modal('show');
        })

        $( "#date-range" ).select2({
            minimumResultsForSearch: -1,
            ajax: { 
                url: "{{ url('timesheet/date-range-ajax') }}",
                type: "get",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        _token: csrf_token,
                        search: params.term // search term
                    };
                },
                processResults: function (response) {
                    return {
                        results: response
                    };
                },
                cache: true
            }
        })

        $( "#first-signatory" ).select2({
            ajax: { 
                url: "{{ url('timesheet/signatory-ajax') }}",
                type: "post",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        _token: csrf_token,
                        search: params.term // search term
                    };
                },
                processResults: function (response) {
                    console.log('response ', response)
                    return {
                        results: response
                    };
                },
                cache: true
            }
        })

        $( "#second-signatory" ).select2({
            ajax: { 
                url: "{{ url('timesheet/signatory-ajax') }}",
                type: "post",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        _token: csrf_token,
                        search: params.term // search term
                    };
                },
                processResults: function (response) {
                    return {
                        results: response
                    };
                },
                cache: true
            }
        })

        $(document).on( 'click', '#accept', function(click) {

            $.ajax({
                url: "{{ url('timesheet/submit') }}",
                type: "POST",
                data: 
                {
                    _token: csrf_token,
                    week: $('#date-range').val(),
                    first: $('#first-signatory').val(),
                    second: $('#second-signatory').val(),
                    comments: $('#comment').val()
                }
            })
        })
    })
</script>
@endsection