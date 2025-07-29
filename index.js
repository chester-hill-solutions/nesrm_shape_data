const cleanString = (str) => {
  if (str === null || str === undefined) return undefined;
  const cleaned = String(str).trim();
  return cleaned === "" ? undefined : cleaned;
};
//get
const getValue = (payload, key) => {
  // Check form fields format
  if (payload[`fields[${key}][value]`] !== undefined) {
    return payload[`fields[${key}][value]`];
  }
  // Check nested fields object
  if (payload.fields && payload.fields[key] !== undefined) {
    return payload.fields[key];
  }
  // Check direct properties
  if (payload[key] !== undefined) {
    return payload[key];
  }
  return undefined;
};

export const handler = async (payload) => {
  const body = payload.event.body;
  try {
    let shaped_data = {
      firstname: cleanString(getValue(body, "firstname")),
      surname: cleanString(getValue(body, "surname")),
      email: cleanString(getValue(body, "email")),
      phone: cleanString(getValue(body, "phone")),

      // Birth date information
      ...(() => {
        const birthData = {};
        const dob = cleanString(getValue("dob"));
        let birthdate = cleanString(getValue("birthday"));
        let birthmonth = cleanString(getValue("birthmonth"));
        let birthyear = cleanString(getValue("birthyear"));
        if (
          birthdate &&
          birthmonth &&
          birthyear &&
          !isNaN(Date.parse(`${birthyear}-${birthmonth}-${birthdate}`))
        ) {
          Object.assign(birthData, { birthyear, birthmonth, birthdate });
          if (dob) {
            birthData.broken_dob = dob;
          }
        } else if (dob) {
          const [birthyear, birthmonth, birthdate] = dob.split("-");
          if (!isNaN(Date.parse(`${birthyear}-${birthmonth}-${birthdate}`))) {
            Object.assign(birthData, { birthyear, birthmonth, birthdate });
          } else {
            birthData.broken_dob = dob;
          }
        }
        return birthData;
      })(),

      street_address: cleanString(getValue(body, "street_address")),
      municipality: cleanString(getValue(body, "municipality")),
      district: cleanString(getValue(body, "district")),
      region: cleanString(getValue(body, "region")),
      country: cleanString(getValue(body, "county")),
      country: cleanString(getValue(body, "country")),
      postcode: cleanString(getValue(body, "postcode")),
      federal_electoral_district: cleanString(
        getValue(body, "federal_electoral_district")
      ),
      district_electoral_district: cleanString(
        getValue(body, "district_electoral_district")
      ),

      ballot1: cleanString(getValue(body, "ballot1")),
      ballot2: cleanString(getValue(body, "ballot2")),
      ballot3: cleanString(getValue(body, "ballot3")),

      comms_consent: cleanString(getValue(body, "ballot1")),
      signup_consent: cleanString(getValue(body, "ballot1")),
      signed_up: cleanString(getValue(body, "ballot1")),
      member: cleanString(getValue(body, "ballot1")),

      organizer: cleanString(getValue(body, "ballot1")),
      language: cleanString(getValue(body, "ballot1")),

      paylods: payload,

      olp23_ballot1: cleanString(getValue(body, "olp23_ballot1")),
      olp23_ballot2: cleanString(getValue(body, "olp23_ballot2")),
      olp23_ballot3: cleanString(getValue(body, "olp23_ballot3")),
      olp23_ballot4: cleanString(getValue(body, "olp23_ballot4")),

      olp23_comms_consent: cleanString(getValue(body, "olp23_comms_consent")),
      olp23_signup_consent: cleanString(getValue(body, "olp23_signup_consent")),
      olp23_volunteeer_status: cleanString(
        getValue(body, "olp23_volunteeer_status")
      ),
      olp23_donor_status: cleanString(getValue(body, "olp23_donor_status")),
      olp23_donation_amount: cleanString(
        getValue(body, "olp23_donation_amount")
      ),
      olp23_signed_up: cleanString(getValue(body, "olp23_signed_up")),
      olp23_organizer: cleanString(getValue(body, "olp23_organizer")),
      olp23_source: cleanString(getValue(body, "olp23_source")),
      olp23_member: cleanString(getValue(body, "olp23_member")),
      olp23_voted: cleanString(getValue(body, "olp23_voted")),
      olp23_voting_group: cleanString(getValue(body, "olp23_voting_group")),
      olp23_voting_location: cleanString(
        getValue(body, "olp23_voting_location")
      ),
      olp23_voting_period: cleanString(getValue(body, "olp23_voting_period")),
      olp23_voting_assocation: cleanString(
        getValue(body, "olp23_voting_assocation")
      ),
      olp23_nate_signup: cleanString(getValue(body, "olp23_nate_signup")),
      olp23_campus_club: cleanString(getValue(body, "olp23_campus_club")),
      olp23_callhub_notes: cleanString(getValue(body, "olp23_callhub_notes")),
      olp23_nes_support_level: cleanString(
        getValue(body, "olp23_nes_support_level")
      ),
      olp23_gender: cleanString(getValue(body, "olp23_gender")),
      olp23_riding: cleanString(getValue(body, "olp23_riding")),
      olp23_organizer_ref_id: cleanString(
        getValue(body, "olp23_organizer_ref_id")
      ),
      olp23_membership_status: cleanString(
        getValue(body, "olp23_membership_status")
      ),
    };

    return shaped_data;
  } catch (error) {
    throw error;
  }
  return shaped_data;
};
