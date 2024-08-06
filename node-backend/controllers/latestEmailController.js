const Imap = require('node-imap');
const { simpleParser } = require('mailparser'); // Import the mailparser library
const dotenv = require("dotenv");
dotenv.config();

const imapConfig = {
    user: process.env.MUSER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.MPORT,
    tls: true
};

module.exports = {
    async latestEmail(req, res) {
        try {
            const email = await getLatestEmail();
            if (email) {
                res.json(email);
            } else {
                res.json({ message: 'No emails found.' });
            }
        } catch (err) {
            res.status(500).json({ error: `Error retrieving email: ${err.message}` });
        }
    },
};

async function getLatestEmail() {
    return new Promise((resolve, reject) => {
        const imap = new Imap(imapConfig);

        function openInbox(cb) {
            imap.openBox('INBOX', false, cb);
        }

        imap.once('ready', function () {
            openInbox(function (err, box) {
                if (err) {
                    reject(err);
                    return;
                }
                imap.search(['ALL'], function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (results.length === 0) {
                        resolve(null);
                        return;
                    }
                    const fetch = imap.fetch(results.reverse()[0], { bodies: '' });
                    fetch.on('message', function (msg, seqno) {
                        let emailData = '';
                        msg.on('body', function (stream) {
                            stream.on('data', function (chunk) {
                                emailData += chunk.toString('utf8');
                            });
                        });
                        msg.once('end', async function () {
                            try {
                                // Parse the email data using mailparser
                                const parsed = await simpleParser(emailData);

                                // Extract the details
                                const emailDetails = {
                                    from: parsed.from.text,
                                    to: parsed.to.text,
                                    date: parsed.date,
                                    subject: parsed.subject,
                                    text: parsed.text,
                                    attachments: parsed.attachments.map(att => ({
                                        filename: att.filename,
                                        contentType: att.contentType,
                                        size: att.size,
                                        contentDisposition: att.contentDisposition,
                                        contentId: att.cid
                                    }))
                                };

                                resolve(emailDetails);
                            } catch (parseErr) {
                                reject(parseErr);
                            }
                        });
                    });
                    fetch.once('error', function (err) {
                        reject(err);
                    });
                    fetch.once('end', function () {
                        imap.end();
                    });
                });
            });
        });

        imap.once('error', function (err) {
            reject(err);
        });

        imap.once('end', function () {
            console.log('Connection ended');
        });

        imap.connect();
    });
}

