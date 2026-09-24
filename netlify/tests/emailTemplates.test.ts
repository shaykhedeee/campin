import { describe, expect, it } from 'vitest';
import { renderOutboxEmail } from '../lib/emailTemplates';

describe('email outbox templates',()=>{
 it('acknowledges a saved enquiry without implying a booking',()=>{
  const mail=renderOutboxEmail({event_key:'enquiry-ack:CMP-123',template_key:'enquiry_ack',recipient:'camper@example.com',attempts:0,payload:{name:'Asha',reference:'CMP-123',listing:'Forest Camp',start_date:'2026-10-01',end_date:'2026-10-03',guests:2}},'Campin <support@campin.co.in>');
  expect(mail.to).toEqual(['camper@example.com']);expect(mail.text).toContain('Availability is awaiting host confirmation');expect(mail.html).toContain('This is not a booking confirmation');expect(mail.text).toContain('2026-10-01');
 });
 it('includes submitted lead details in text and escapes them in HTML',()=>{
  const mail=renderOutboxEmail({event_key:'lead-alert:HOST-1',template_key:'lead_alert',recipient:'support@campin.co.in',attempts:0,payload:{lead_type:'Host application',name:'<img src=x>',email:'host@example.com',payload:{propertyName:'River <Camp>',photoSource:'Owner permission'}}},'Campin <support@campin.co.in>');
  expect(mail.text).toContain('Property Name: River <Camp>');expect(mail.text).toContain('Photo Source: Owner permission');expect(mail.html).toContain('&lt;img src=x&gt;');expect(mail.html).not.toContain('<img src=x>');expect(mail.html).toContain('/admin.html#/workspace');
 });
});
