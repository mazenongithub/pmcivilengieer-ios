import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
class EnvironmentalVariables {
    getvariables() {
        const variables = {
            development: {
                stripeClient: 'pk_test_4ZCejPXp1eoTTdAlwpZW3a4M',
                serverAPI: 'http://3.82.242.160:8081'
               },
            production: {
                stripeClient: 'pk_live_NGJS73N6Hmokpws9S1Qn8Nxs',
                serverAPI: 'https://api.civilengineer.io'
            }
        };

        if (__DEV__) {

            return variables.development; // return this if in development mode
        }

        return variables.production; // otherwise, return this
    }

    configs() {
        const variables = new EnvironmentalVariables();
        const configs = {
            publishableKey: variables.getvariables().stripeClient,
        }

        Stripe.setOptionsAsync(configs);
    }

}
export default EnvironmentalVariables;