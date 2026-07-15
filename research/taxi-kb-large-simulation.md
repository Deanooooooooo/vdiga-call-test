# Synthetic Large Taxi Company Knowledge Base

> Simulation only. Replace all names, zones, tariffs, phone numbers, SLAs, and policies with the taxi company's approved data before production. Dynamic availability, ETA, and journey prices must come from the dispatch API, not this document.

## Company profile

Metro Taxi Group is a fictional 24/7 taxi operator serving a large capital city and surrounding municipalities. The company operates standard saloons, estates, six-seat vehicles, wheelchair-accessible vehicles, executive vehicles, child-seat vehicles, and pet-friendly vehicles. The AI receptionist may explain services, collect booking details, create or amend bookings through approved tools, and transfer exceptional cases to a human dispatcher.

## Information the receptionist must collect

For a new booking collect: passenger name, callback number, exact pickup address, pickup date and time, destination, passenger count, luggage amount, vehicle requirements, accessibility requirements, child-seat requirements, pet information, flight or train details when relevant, payment method, and any safe pickup notes. Repeat the pickup address, date, time, and destination before submitting.

Never request card numbers, PINs, passwords, medical diagnoses, or unnecessary identity documents. Never promise a driver, vehicle type, ETA, or fixed fare until the dispatch or quotation tool confirms it.

## Booking types

### Immediate booking

An immediate booking requests the next suitable vehicle. The dispatch system supplies availability and ETA. During peak periods the receptionist must describe the ETA as an estimate, not a guarantee. If no vehicle is available, offer a later estimate or transfer to dispatch according to the live tool result.

### Scheduled booking

Scheduled bookings may be requested up to 90 days ahead. Recommend additional pickup margin for airports, hospitals, court appointments, major events, severe weather, and mobility-assisted journeys. A scheduled booking reserves dispatch priority but does not guarantee a specific driver unless the dispatch system explicitly confirms one.

### Return and recurring booking

A return journey is stored as a separate booking. A recurring booking requires the same pickup pattern for at least two occurrences. Corporate recurring bookings may require an account reference or cost centre.

### Multi-stop booking

Collect every stop in order. Waiting and distance continue to affect the metered or calculated fare. Stops involving collections must include the passenger's instructions, but drivers cannot collect illegal, unsafe, unidentified, or unaccompanied restricted items.

## Service area

### Central zone

The central zone includes the historic centre, government district, main retail streets, central railway station, central coach station, university quarter, and inner residential districts. Access restrictions, pedestrian zones, road closures, and event security may require a nearby legal pickup point.

### Inner urban zone

The inner urban zone includes dense residential neighbourhoods, business parks, hospitals, shopping centres, stadiums, and metro interchanges. The receptionist must ask for an entrance, block, gate, or landmark when a complex has multiple access points.

### Outer urban zone

The outer urban zone includes peripheral residential districts, industrial estates, logistics parks, ring-road locations, and large retail parks. Some sites require a gate number, company name, warehouse unit, or security contact.

### Suburban zone

The suburban zone includes nearby towns and villages within approximately 35 kilometres of the city centre. Availability may be lower late at night. The quotation tool must decide whether pickup travel, minimum fare, or out-of-area terms apply.

### Extended zone

Journeys beyond the suburban zone are accepted subject to availability. Long-distance trips may require advance booking, a fixed quotation, a deposit, or dispatcher approval. Never calculate these manually from the knowledge base.

## Major pickup locations

### International Airport Terminal 1

Ask for airline, flight number, arrival time, passenger name, mobile number, luggage quantity, and whether meet-and-greet is required. Use only the pickup area returned by the airport instruction tool. Flight monitoring and waiting allowance depend on the booked product.

### International Airport Terminal 2

Ask the same airport questions and confirm the terminal. Do not assume the terminal from the airline because terminals can change. For delayed flights, use the live booking record before explaining revised pickup arrangements.

### Central railway station

Ask for train arrival time, origin, platform if known, and the agreed pickup entrance. Station road closures can change pickup points. The driver may call or message when approaching.

### Central coach station

Ask for coach operator, service origin, scheduled arrival, and pickup entrance. Large luggage or groups may require an estate or six-seat vehicle.

### Hospitals and clinics

Ask for building, entrance, ward reception or outpatient department, and mobility needs. The service is not an ambulance and cannot provide clinical monitoring, lifting, oxygen, emergency transport, or medical treatment. For a medical emergency instruct the caller to contact emergency services.

### Hotels and conference venues

Ask for the hotel or event name, entrance, passenger name, room or booking reference only if the venue requires it, and the pickup time. For large conferences, use the event pickup plan returned by dispatch.

### Stadiums and arenas

Event road closures may force designated pickup zones. Explain that walking to the legal pickup point may be necessary. ETA can increase sharply after an event.

## Vehicle categories

### Standard saloon

Suitable for up to four passengers with ordinary luggage, subject to the actual vehicle capacity returned by dispatch.

### Estate vehicle

Suitable for additional luggage, folded mobility aids, or bulky but safe personal items. The passenger must describe unusually large items.

### Six-seat vehicle

Suitable for five or six passengers depending on luggage. Never split a party across vehicles without explicit agreement.

### Wheelchair-accessible vehicle

Ask whether the passenger remains seated in the wheelchair, the wheelchair type and approximate dimensions, number of accompanying passengers, pickup access, destination access, and any assistance required. Availability must be confirmed by dispatch. Drivers assist within training and safety limits but do not provide lifting or medical care.

### Executive vehicle

Available by advance booking in selected areas. Confirm the service level and price through the quotation tool.

### Child-seat vehicle

Ask for each child's age, approximate weight, and required seat type. Availability is limited and must be confirmed. A passenger-provided seat may be accepted only under company policy and must be fitted by the responsible adult unless local policy states otherwise.

### Pet-friendly vehicle

Ask animal type, size, carrier use, and whether the animal is an assistance animal. Assistance animals are handled under applicable law and company accessibility policy. Other pets may require a suitable vehicle and cleaning conditions.

## Fare and quotation policy

### General rule

The receptionist may quote a fare only from the live quotation tool. The knowledge base may explain fare components but must never be used to perform arithmetic or guarantee a price.

### Fare components

A fare may reflect pickup location, destination, route, distance, time, traffic, waiting, vehicle category, booking type, airport or venue charges, tolls, parking, cleaning, peak demand, out-of-area pickup, and approved extras. The dispatch system determines which components apply.

### Fixed quote

A fixed quote is valid only for the route, time, passengers, luggage, vehicle category, stops, and conditions recorded when quoted. Changes can require a new quote. Excessive waiting, extra stops, destination changes, soiling, damage, tolls, parking, or undeclared requirements may be charged separately under company terms.

### Metered journey

For a metered journey, the final fare depends on the approved meter and applicable tariff. Traffic and waiting can affect the total. Do not give a guaranteed total for a metered journey.

### Estimate

An estimate is not a fixed quote. State the currency, whether tax is included, and any exclusions returned by the tool. If the tool is unavailable, offer to create the booking without a price only when policy allows, or transfer to dispatch.

### Discounts and promotions

Apply only promotions returned as valid by the account or quotation tool. Never invent, combine, extend, or manually calculate a discount. Corporate pricing is confidential to the authorised account contact.

## Payment methods

Depending on the booking and vehicle, payment may be accepted by cash, in-vehicle card terminal, approved payment link, stored corporate account, voucher, or app. Confirm available methods from the booking tool. Never take full card details by voice.

## Corporate accounts

For account bookings collect company name, authorised passenger, account reference, cost centre or purchase order if required, pickup, destination, and contact number. Do not disclose account journeys, prices, passenger data, limits, or billing details to an unauthorised caller. Account creation, credit changes, invoices, refunds, and disputes go to the accounts team.

## Driver arrival and passenger contact

The driver may contact the passenger by call or message. The passenger should remain reachable and wait at the confirmed legal pickup point. If the passenger cannot locate the vehicle, use the booking-status tool before transferring to dispatch. Do not disclose a driver's personal number, home address, schedule, or unrelated journey information.

## Waiting and no-show policy

Waiting allowance varies by booking type and location. Airport waiting may depend on the monitored landing time. After the included allowance, waiting charges or cancellation terms may apply. A no-show may be recorded when the driver reaches the confirmed pickup point, attempts approved contact, waits the required period, and cannot find the passenger. Use the booking record for exact status and charges.

## Amendments and cancellations

Verify the caller using the booking reference and approved contact details. Amendments to time, pickup, destination, stops, passengers, luggage, or vehicle needs can change availability and price. Cancellation fees depend on timing, vehicle assignment, driver travel, booking type, and account terms. Quote only the fee returned by the booking tool.

## Delays and disruptions

Traffic, road closures, severe weather, public transport disruption, airport congestion, major events, security incidents, and exceptional demand can affect availability and ETA. Give the live ETA and timestamp from dispatch. Never claim that a driver will arrive at an exact minute unless the system describes it as guaranteed.

## Safety and emergency rules

For immediate danger, crime in progress, serious collision, fire, or medical emergency, instruct the caller to contact the appropriate emergency service. The taxi line is not an emergency service. Do not attempt medical diagnosis, crisis counselling, or law-enforcement intervention.

If a caller reports threats, violence, weapons, intoxication creating danger, trafficking, or an unsafe pickup, record only essential information and transfer to the safety team under the escalation flow. Never promise secrecy or personally confront another party.

## Unaccompanied minors

Bookings for minors follow local law and company safeguarding policy. Collect the responsible adult's details, minor's age, pickup and destination contacts, and any approved reference. If the policy tool does not confirm eligibility, transfer to a human dispatcher. Never improvise consent rules.

## Intoxicated passengers

Drivers may refuse transport when a passenger presents a safety, violence, contamination, or medical risk. A severely unwell or unresponsive person requires emergency services, not a taxi.

## Luggage and prohibited items

Ask about oversized luggage, sports equipment, musical instruments, mobility aids, fragile items, and high-volume shopping. Vehicles cannot carry illegal goods, unsecured hazardous materials, leaking containers, items that obstruct safe driving, or loads beyond legal capacity.

## Lost property

Collect booking reference, journey date and approximate time, pickup, destination, passenger name, callback number, item description, distinctive features, and where the item may have been left. Do not promise recovery. Never reveal the next passenger's details or driver location. High-risk items such as medication, identity documents, keys, phones, or financial cards should be flagged according to the lost-property workflow.

## Complaints

Collect booking reference, date and time, pickup, destination, complaint category, concise factual description, desired resolution, and safe callback details. Do not admit legal liability, promise compensation, or argue. Safety, discrimination, harassment, overcharging, dangerous driving, privacy, and accessibility complaints receive priority escalation.

## Refunds and fare disputes

The receptionist may log a dispute but cannot approve a refund unless the refund tool explicitly authorises it. Collect the charged amount, expected amount, payment method, receipt or booking reference, and reason for dispute. Card settlement times depend on the bank and payment process.

## Privacy and recordings

Calls may be recorded for service, training, safety, and dispute handling where permitted. Explain the approved privacy wording when asked. Provide the privacy contact or process for access, correction, deletion, restriction, or complaint requests. Do not read personal data from prior bookings unless identity and authority are verified.

## Languages

The service supports the languages configured for the live agent. If the caller cannot be served reliably, offer an approved language option or human transfer. Never pretend fluency or translate safety-critical details with low confidence.

## Human transfer rules

Transfer to dispatch for: tool failure affecting a booking, no suitable vehicle with an urgent operational need, complex accessibility cases, safeguarding uncertainty, high-value or unusual transport, disputed live driver location, or caller request after one reasonable attempt to help.

Transfer to safety for: threats, violence, serious discrimination, harassment, dangerous driving, collision, missing vulnerable passenger, suspected crime, or urgent privacy exposure.

Transfer to accounts for: corporate account setup, credit limits, invoices, tax documents, payment reconciliation, refunds requiring approval, and repeated fare disputes.

## Tool failure fallback

If booking, quotation, availability, flight, payment, or status tools fail, apologise briefly and do not invent an answer. Collect only the minimum information allowed by the fallback workflow, provide a reference if available, and transfer or arrange a callback. Mark all unconfirmed details as pending.

## Common caller questions

### How much will my taxi cost?

Use the quotation tool with exact pickup, destination, time, passengers, stops, luggage, and vehicle needs. State whether the result is fixed or estimated and repeat material exclusions.

### How soon can a taxi arrive?

Use the live availability tool. State the returned ETA as an estimate and include major disruption information when provided.

### Can I book for tomorrow?

Yes, subject to availability. Collect the scheduled booking details and submit them to dispatch.

### Can you guarantee an airport pickup?

Only describe the confirmed service level returned by the booking tool. Explain required flight and contact details and any waiting allowance.

### Can I pay by card?

Confirm the payment methods returned for the selected booking and vehicle. Do not collect card numbers over the call.

### Can I travel with a wheelchair?

Ask the accessibility questions and check a suitable vehicle through dispatch. Do not promise availability before confirmation.

### Can I bring a pet?

Ask the pet questions and check a pet-friendly vehicle. Assistance animals follow the applicable accessibility policy.

### Where is my taxi?

Verify the booking and use the live status tool. Do not rely on the knowledge base for driver location.

### I left something in the taxi. What happens now?

Create a lost-property report with the required journey and item details. Explain that recovery cannot be guaranteed.

### I want to complain about a driver.

Create a factual complaint record and apply the correct escalation priority. Do not argue or promise a specific outcome.

## Retrieval guidance

Retrieve the smallest relevant section for the caller's topic. Prefer live tools for price, ETA, availability, booking status, driver assignment, flight changes, promotions, payment status, and account eligibility. Use this knowledge base for stable explanations, required questions, restrictions, privacy wording, and escalation policy.
