<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>
      Name: {{$name}}
    </div>
    <div>
      Email: {{$email}}
    </div>
    <div>
      Subject: {{$subject}}
    </div>
    <div>
      Message:
      {{$message_body}}
    </div>
</body>
</html>
