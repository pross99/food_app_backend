import { VendorPayload } from './Vendor.dto'
import {CustomerPayload} from './Customer.dto'


// mulighed for flere payloads 
export type AuthPayload = VendorPayload | CustomerPayload; 