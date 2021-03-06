<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;

    /**
     * Create a new message instance.
     *
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from("contact@plugboard.xyz")->replyTo($this->data['email'])->view('emails.contact')->with([
                        'name' => $this->data['name'],
                        'email' => $this->data['email'],
                        'subject' => $this->data['subject'],
                        'message_body' => $this->data['message']
                    ]);
    }
}
