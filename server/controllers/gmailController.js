import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export const updateGmailSignature = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET);
  const gmail = google.gmail('v1');
  const { access_token, signature }  = req.body;
  if(!access_token || !signature){
    return res.status(422).send("access_token or signature is missing");
  }
  try {
    const tokenInfo = await client.getTokenInfo(access_token);
    const userEmail = tokenInfo.email;
    client.setCredentials({
      access_token: access_token,
    });
    google.options({auth: client});
    const result = await gmail.users.settings.sendAs.update({
      userId: userEmail,
      sendAsEmail: userEmail,
      requestBody : {
          signature : signature
      },
      access_token: access_token

    });
    const updatedSign = result.data.signature;
    return res.json(`Signature '${updatedSign}' has been updated`);
  

  } catch (error) {
      res.send(error);
  }
  
  }