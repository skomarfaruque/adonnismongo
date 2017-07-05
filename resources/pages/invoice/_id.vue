
<template>
  <section>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4">
        <label><b>Date:</b> {{ dateFormated(invoice.start_time) }}</label><br>
        <label><b>Invoice:</b> {{invoice._id}}</label><br>
        <label><b>Phostorian name:</b> {{invoice.agent.name}}</label>
      </div>
      <div class="column is-2">

      </div>
      <div class="column is-4">
        <label><b>Customer:</b> {{invoice.customer.name}}</label><br>
        <label class="label">Address:</label>
        <span> {{invoice.customer.address1}}, {{invoice.customer.address2}}</span><br/>
        <span>City: {{invoice.customer.city}}, </span>
        <span>State: {{invoice.customer.state}}, </span>
        <span>Zip Code: {{invoice.customer.zipCode}} </span><br>
        <label><b>Phone:</b> {{invoice.customer.phone}}</label><br>
        <label><b>Email:</b> {{invoice.customer.email}}</label>
      </div>
      <div class="column is-1"></div>
    </div>
    <div class="columns itemselect">
      <div class="column is-1"></div>
      <div class="column is-10 box">
        <div class="level">
          <div class="level-item">
            <div class="level-right">

            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                Action
              </th>
              <th>
                Sl#
              </th>
              <th>
                Item
              </th>
              <th>
                Price
              </th>
              <th>
                Quantity
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in invoice.items">
              <td>
              <a v-if="item.description !== '2 Hour Scanning' && item.description !== 'Scanning 1/4 Hour'" class="button" @click="removeItem(i)">-</a>
              </td>
              <td>{{i + 1}} </td>
              <td>{{item.description}}</td>
              <td><input type="number" class="input" min="0"  step="any"  v-model="item.price"></td>
              <td>{{item.quantity}}</td>
              <td>${{twoDigitFormat(item.price * item.quantity)}}</td>

            </tr>
            <tr>
              <td>
                <a class="button" @click="addItem">+</a>
              </td>
              <td>

              </td>
              <td>
                <p class="control">
                  <span class="select">
                    <select v-model="newItem" @change="changePrice">
                      <option value="" selected>Select item</option>
                      <option v-for="(item, ind) in products" v-bind:value="item">{{ item.name }}</option>
                    </select>
                  </span>
                </p>
              </td>
              <td>
                ${{price}}
              </td>
              <td>
                <input type="number" class="input" min="1"  v-model="quantity">
              </td>
              <td>
                ${{twoDigitFormat(price*quantity)}}
              </td>

            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{twoDigitFormat(total)}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Discount Saving</label></td>
              <td>${{parseFloat(!discount?0:discount)}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Shipping</label></td>
              <td>${{!shipping?0:shipping}}</td>
            </tr>
            <tr>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{twoDigitFormat(total - parseFloat(discount < 0 || !discount ? 0: discount) + parseFloat(shipping < 0 || !shipping  ? 0:shipping)) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Tax({{totalTax}}%)</label></td>
              <td>${{twoDigitFormat(taxCal)}}</td>
            </tr>
            <tr>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Grand Total</label></td>
              <!--<td>${{total - parseFloat(discount) + parseFloat(shipping) * totalTax / 100}}</td> -->
              <td>${{twoDigitFormat(priceDisShipTax) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-1"></div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-10">
        <div class="columns">
          <div class="column is-4">
            <div class="columns">

              <div class="column is-4">
                <label class="label">Shipping</label>

              </div>
              <div class="column is-8">
                <input class="input" type="number" min="0" v-model="shipping">
              </div>
              <!--<div class="column is-2">
                <a class="button">Apply</a>
              </div>-->
            </div>
          </div>
          <div class="column is-4">
            <div class="columns">

              <div class="column is-3">
                <label class="label">Discount</label>

              </div>
              <div class="column is-5">
                <input class="input" type="text" v-model="discount">
              </div>
              <div class="column is-4">
                <a class="button is-info"> Apply </a>
              </div>
              <!--<div class="column is-2">
                <a class="button">Apply</a>
              </div>-->
            </div>

          </div>
          <div class="column is-4">
            <div class="columns">
              <div class="column is-3">
                <label class="label">Tax</label>
              </div>
              <div class="column is-8">
                <input class="input" type="number" min="0" v-model="totalTax">
              </div>
              <div class="column is-1">
                %
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-2">
            <label class="label">Comment</label>
          </div>
          <div class="column is-10">
            <textarea class="textarea" v-model="invoice.invoice_comment">{{ invoice.invoice_comment }}</textarea>
          </div>
        </div>
        <div class="columns" v-if="invoice.invoice_settled === false">
          <div class="column is-2"></div>
          <div class="column is-8 block has-text-centered">
            <a href="javascript:" class="button is-info is-large" @click="isCashOff=true">Cash</a>
            <a class="button is-info is-large" @click="isCheckOff=true">Check</a>
            <a class="button is-info is-large" @click="isCreditOff=true">Credit</a>
          </div>
          <div class="column is-2"></div>
        </div>
        <div class="columns" v-if="invoice.payment_method === 'cash'">
          <div class="column is-6 is-offset-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Payment Method: Cash
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                    Total: <b>${{ total }}</b><br>
                    Discount: <b>${{ parseFloat(discount) }}</b><br>
                    Shipping: <b>${{ parseFloat(shipping) }}</b><hr>
                    Amount: <b>${{total - parseFloat(discount) + parseFloat(shipping)}}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns" v-if="invoice.payment_method === 'check'">
          <div class="column is-6 is-offset-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Payment Method: Check
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <b>Payment Method description</b><br>
                  Check Number: <b>{{invoice.payment_method_desc.check_no}}</b><br>
                  Account Number: <b>{{ invoice.payment_method_desc.account_no }}</b><br>
                  Routing Number: <b>{{ invoice.payment_method_desc.routing_no }}</b><br>
                  Front Of Check:<br><img :src="`/check_doc/${invoice.payment_method_desc.front_file}`" alt=""><br>
                  Back Of Check:<br><img :src="`/check_doc/${invoice.payment_method_desc.back_file}`" alt=""><br>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="columns" v-if="invoice.payment_method === 'card'">
          <div class="column is-6 is-offset-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Payment Method: Credit Card
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <b>Payment Method description</b><br>
                  Amount: <b>${{total - parseFloat(discount) + parseFloat(shipping) }}</b><br>
                  Shipping: <b>${{parseFloat(shipping) }}</b><br>
                  Exp Date: <b>{{ invoice.payment_method_desc.exp_date }}</b><br>
                  Credit Card No: <b>{{ invoice.payment_method_desc.card_no }}</b><br>
                  Credit Card Code: <b>{{ invoice.payment_method_desc.card_code }}</b><br>
                  Tax:  <b>{{ invoice.payment_method_desc.tax }}</b><br>
                  <b>Bill to:</b><br>
                  First Name: <b>{{ invoice.payment_method_desc.bill_first_name }}</b><br>
                  Last Name: <b>{{ invoice.payment_method_desc.bill_last_name }}</b><br>
                  Company: <b>{{ invoice.payment_method_desc.bill_company }}</b><br>
                  Address: <b>{{ invoice.payment_method_desc.bill_address }}</b><br>
                  City: <b>{{ invoice.payment_method_desc.bill_city }}</b><br>
                  State: <b>{{ invoice.payment_method_desc.bill_state }}</b><br>
                  Zip: <b>{{ invoice.payment_method_desc.bill_zip }}</b><br>
                  <b>Ship to:</b><br>
                  First Name: <b>{{ invoice.payment_method_desc.ship_first_name }}</b><br>
                  Last Name: <b>{{ invoice.payment_method_desc.ship_last_name }}</b><br>
                  Company: <b>{{ invoice.payment_method_desc.ship_company }}</b><br>
                  Address: <b>{{ invoice.payment_method_desc.ship_address }}</b><br>
                  City: <b>{{ invoice.payment_method_desc.ship_city }}</b><br>
                  State: <b>{{ invoice.payment_method_desc.ship_state }}</b><br>
                  Zip: <b>{{ invoice.payment_method_desc.ship_zip }}</b><br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
    <div v-bind:class="{ modal: true, 'is-active': isCashOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Pay Via Cash</h1>
          <div class="box">
            <div class="columns invoice-label">
              <div class="column is-2"></div>
              <div class="column is-8">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Total</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{ twoDigitFormat(total)}}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Shipping</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseFloat(!shipping?0:shipping)}}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Discount</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseFloat(!discount?0:discount)}}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Tax({{totalTax}}%)</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{taxCal}}</span><br/>
                    </div>
                  </div>
                </nav>
                <hr>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Payable Amount</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{twoDigitFormat(priceDisShipTax) }}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Cash paid</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input type="number" v-model="paid_amount"></span><br/>
                    </div>
                  </div>
                </nav>
                <hr>
                 <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Return amount</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>{{returnAmount}}<input type="hidden" v-model="returnAmount"></span><br/>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="column is-2"></div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">

            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="payment('cash')">Submit</a>
              <a class="button is-info" @click="isCashOff=false">Cancel</a>
            </div>
          </div>
        </div>
        <button class="modal-close" @click="isCashOff=false"></button>
      </div>
    </div>
<div v-bind:class="{ modal: true, 'is-active': processing }">
  <div class="modal-background"></div>
  <div class="modal-content has-text-centered">
    <p class="image is-64x64 has-text-centered" style="margin:auto">
     <img src="~assets/img/loading.gif" alt="Bulma logo">
    </p>
  </div>
</div>
    <div v-bind:class="{ modal: true, 'is-active': isCheckOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form id="myForm" name="myForm">
          <div class="box">
            <h1 class="title">Pay Via Check <span style="float: right;font-size: 15px;padding-top: 10px;">Invoice: {{invoice._id}}</span></h1>
            <div class="box">
              <div class="columns invoice-label">
                <div class="column is-1"></div>
                <div class="column is-10">
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Amount</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input class="input"  name="amount"  required type="number" v-model="check.amount" placeholder="Enter Amount">
                        </span>
                      </div>
                    </div>
                  </nav><br>
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Check Number</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input class="input"  name="check_no" type="text" v-model="check.check_no" placeholder="Enter Check Number">
                        <input class="input"  name="paymentType" type="hidden" value="check" placeholder="Enter Check Number">
                        <input class="input"  name="id" type="hidden" v-bind:value="invoice._id" placeholder="Enter Check Number">
                        <input class="input"  name="invoiceComment" type="hidden" v-model="invoice.invoice_comment" placeholder="">
                        <input class="input"  name="discount" type="hidden" v-model="discount" placeholder="">
                        <input class="input"  name="shipping" type="hidden" v-model="shipping" placeholder="">
                        <input class="input"  name="tax" type="hidden" v-model="totalTax" placeholder="">
                        </span>
                      </div>
                    </div>
                  </nav><br>
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Account Number</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input class="input" name="account_no" type="text" v-model="check.account_no" placeholder="Account Number"></span>
                      </div>
                    </div>
                  </nav><br>
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Routing Number</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input class="input" id ="routing_no" name="routing_no" type="text" v-model="check.routing_no" placeholder="Routing Number"></span>
                      </div>
                    </div>
                  </nav><br>
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Upload Front of Check</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input type="file" required name="front_file" id="frontFile" @change="onFileChange"><br><img
                         style="max-width: 300px;" :src="check.check_front" alt=""></span>
                      </div>
                    </div>
                  </nav><br>
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <span>Upload Back of Check</span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span><input type="file" name="back_file" id="backFile" ref="fileInput" @change="onFileChange"><br><img style="max-width: 300px;" :src="check.check_back" alt=""></span>
                        <!-- <span><input type="file" @change="onFileChange"><br><img :src="check.check_back" alt=""><button @click="removeImage">Remove image</button></span> -->
                      </div>
                    </div>
                  </nav><br>
                </div>
                <div class="column is-1"></div>
              </div>
            </div>
            <div class="level">
              <div class="level-left is-6">

              </div>
              <div class="level-right is-6 block">
                <a class="button is-info" @click="paymentCheck()">Submit</a>
                <a class="button is-info" @click="isCheckOff=false">Cancel</a>
              </div>
            </div>
          </div>
        </form>
        <button class="modal-close" @click="isCheckOff=false"></button>
      </div>
    </div>
    <div v-bind:class="{ modal: true, 'is-active': isCreditOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Pay Via Credit Card</h1>{{card.exp_date}}
          <div class="box">
            <div class="columns invoice-label">
              <div class="column is-6">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Credit Card No</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" type="text" v-model="card.card_no" placeholder="Credit Card No"></span>
                    </div>
                  </div>
                </nav><br>
                
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Exp Date</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input size="5" class="input is-2" v-model="card.exp_month" type="text" placeholder="Month"></span>&nbsp;&nbsp;&nbsp;
                      <span><input size="5" class="input is-2" v-model="card.exp_year" type="text" placeholder="Year"></span>
                      
                    </div>
                  </div>
                </nav><br>
                <!--<nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Tax</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.tax" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>-->
                
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Bill to</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>First Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input"  v-model="card.bill_first_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Last Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_last_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Company</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_company" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Address</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_address" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>City</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_city" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>State</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_state" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Zip</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_zip" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Country</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_country" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>

              </div>
              <div class="column is-6">
                <!--<nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Shipping</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseFloat(!shipping?0:shipping)}}</span>
                    </div>
                  </div>
                </nav><br>-->
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Amount</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{twoDigitFormat(priceDisShipTax) }}</span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Card Code</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.card_code" type="text" placeholder="Credit Card Code"></span>
                    </div>
                  </div>
                </nav><br>
                
               
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Ship to</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                     <span><b>Copy billing</b> &nbsp;&nbsp;&nbsp;<input class="" @click="copyBillingToShip" type="checkbox"></span><br>
                    </div>
                  </div>
                </nav><br>
                <!--<nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Copy billing</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                     <span><input class="" @click="copyBillingToShip" type="checkbox"></span><br>
                    </div>
                  </div>
                </nav><br>-->
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>First Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_first_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Last Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_last_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Company</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_company" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Address</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_address" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>City</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_city"  type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>State</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_state" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Zip</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_zip" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Country</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_country" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>

              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">

            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="payment('card')">Submit</a>
              <a class="button is-info" @click="isCreditOff=false">Cancel</a>
            </div>
          </div>
        </div>
        <button class="modal-close" @click="isCreditOff=false"></button>
      </div>
    </div>
  </section>
</template>
<style scoped>
  tbody tr td {
    padding: 5px 0px 5px 0px;
  }
  .invoice-label .level:not(:last-child) {
     margin-bottom: 0rem;
  }
  tfoot {
    margin-top: 10px;
    border-top: 1px solid #e3e3e3;
  }
  .block a.button {
    margin: 10px;
  }
  .itemselect .input {
    width: 50%;
  }
</style>
<script>
import MaskedInput from 'vue-text-mask'
import moment from 'moment'
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Invoice Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Invoice Edit', 'Edit Invoice information.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`invoice/${params.id}`)
    let { data: products } = await axios.get('supplies')
    return {
      invoice: data,
      invoice_settled:'',
      payment_method:'',
      processing:false,
      card: {
        card_no:'4242424242424242',
        tax:'',
        exp_date:'',
        exp_month:'08',
        exp_year:'22',
        ship_first_name:'',
        ship_last_name:'',
        ship_company:'',
        ship_address:'',
        ship_city:'',
        ship_state:'',
        ship_zip:'',
        ship_country:'',
        card_code:'999',
        bill_first_name:'',
        bill_last_name:'',
        bill_company:'',
        bill_address:'',
        bill_city:'',
        bill_state:'',
        bill_zip:'',
        bill_country:''
      },
      check: {
        amount:'',
        check_no:'',
        account_no:'',
        check_front:'/_nuxt/img/logo.9fd5444.png',
        check_back:'/_nuxt/img/logo.9fd5444.png',
        check_front_file:'',
        check_back_file:'',
        routing_no:''
      },
      cash: {
        return_amount:0.00
      },
      paid_amount:0.00,
      products,
      discount: '',
      shipping: '',
      totalTax: '',
      newItem: '',
      price: 0.00,
      quantity: 1,
      isCashOff: false,
      isCheckOff: false,
      isCreditOff: false,
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
watch: {
    shipping: function (newValue) {
      if(newValue < 0 ){
        this.shipping =''
        this.$toasted.show('Shipping can not be less than 0.', { duration: 4500 })
      }
    },
    discount: function (newValue) {
      if(newValue < 0){
        this.discount = ''
        this.$toasted.show('Discount can not be less than 0.', { duration: 4500 })
      }
    },
    totalTax: function (newValue) {
      if(newValue < 0){
        this.totalTax = ''
        this.$toasted.show('Tax can not be less than 0.', { duration: 4500 })
      }
    },
    paid_amount: function (newValue) {
      if(newValue < 0){
        this.$toasted.show('Paid  can not be less than 0.', { duration: 4500 })
      }
    },

  },
  computed: {
    total () {
      let total = 0
      let self = this
      this.invoice.items.forEach(item => {
        item.total = item.quantity * item.price * item.commission / 100
        total += item.quantity * item.price
      })
      return total
    },
    taxCal(){
      return (parseFloat(this.total) - parseFloat(!this.discount || this.discount<0?0:this.discount) + parseFloat(!this.shipping || this.shipping<0?0:this.shipping))*parseFloat(!this.totalTax || this.totalTax<0?0:this.totalTax)/100
    },
    priceDisShipTax(){
      let tax = (this.total - parseFloat(!this.discount || this.discount<0?0:this.discount) + parseFloat(!this.shipping || this.shipping<0?0:this.shipping))*parseFloat(!this.totalTax || this.totalTax<0?0:this.totalTax)/100
      let price = (this.total - parseFloat(!this.discount || this.discount<0?0:this.discount) + parseFloat(!this.shipping || this.shipping<0?0:this.shipping))
      let grandTotal = tax + price
      return grandTotal
    },
    returnAmount (){
      let return_amount = (this.paid_amount - this.priceDisShipTax)<0 ? 0 : (this.paid_amount - this.priceDisShipTax)
      this.cash.return_amount = return_amount.toFixed(2)
      return return_amount.toFixed(2)
    }
  },
  methods: {
    save () {

    },

    dateFormated (date) {
    return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY')
    },
    twoDigitFormat (value) {
      return value.toFixed(2);
    },
    async addItem () {
      if(!this.newItem.name) {
        return this.$toasted.show('Items must be selected.', { duration: 4500 })
      }
      if(this.quantity === 0) {
        return this.$toasted.show('Quantity must be greater than 0.', { duration: 4500 })
      }
      this.invoice.items.push({
        description: this.newItem.name,
        price: this.newItem.price,
        quantity: this.quantity,
        commission: this.newItem.commission
      })
      let self = this
      this.price = 0
      this.newItem = ''
      this.quantity = 1
      // location.reload()
      let { data } = await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
      
   },
    async removeItem (index) {
      this.invoice.items.splice(index, 1)
      await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
    },
    async payment (type) {
      var paymentDescription ={}
      var self = this
      if (type === 'card') {
        this.card.exp_date = this.card.exp_month + this.card.exp_year
        paymentDescription = this.card
        console.log(paymentDescription)
      }  else {
          if (this.paid_amount < this.priceDisShipTax){
            return this.$toasted.show('Sorry amount is low', { duration: 4500 })
          }
          paymentDescription = {customer_paid:this.paid_amount, return_amount: this.cash.return_amount}
      }
      var result = await this.axios.post(`invoice/payment`, { id: this.invoice._id, paymentType: type, paymentDescription: paymentDescription, invoice: this.invoice, discount: this.discount, shipping: this.shipping, tax: this.totalTax })
      if(type === 'cash'){
        if (result.data.error !=='no'){
        return this.$toasted.show(result.data.error, { duration: 4500 })
        } else {
          this.$router.push(`/invoice/paid/${this.invoice._id}`)
        }

      } else {
         if (result.data.error !=='no'){
           return this.$toasted.show(result.data.error, { duration: 4500 })
        }else {
          this.$router.push(`/invoice/paid/${this.invoice._id}`)
        }
      }


    },
    async paymentCheck (){
        var myForm = document.getElementById('myForm')
        let formData = new FormData(myForm)
        if (formData.get('amount') == "") {
          return this.$toasted.show("Amount can not be empty", { duration: 4500 })
        }
        if (formData.get('check_no') == "") {
          return this.$toasted.show("Check number can not be empty", { duration: 4500 })
        }
        if (formData.get('account_no') == "") {
          return this.$toasted.show("Acount number can not be empty", { duration: 4500 })
        }
        if (formData.get('routing_no') == "") {
          return this.$toasted.show("Routing can not be empty", { duration: 4500 })
        }
        if (document.getElementById('frontFile').value  == "") {
          return this.$toasted.show("Check front side is empty", { duration: 4500 })
        }
        if (document.getElementById('backFile').value  == "") {
          return this.$toasted.show("Check back side is empty", { duration: 4500 })
        }
        this.isCheckOff = false
        this.processing = true
        let newinfo = await this.axios.post(`invoice/payment`, formData)
          if (newinfo.data.error !=='no'){
            this.processing = false
            this.isCheckOff = true
            return this.$toasted.show(newinfo.data.error, { duration: 4500 })
          }else {
            this.$router.push(`/invoice/paid/${this.invoice._id}`)
          }
      },
    changePrice () {
        this.price = 0
        if(this.newItem.price){
        this.price = this.newItem.price
        }
    },
    onFileChange(e) {
      var targetId = e.target.id
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return;
      this.createImage(files[0], targetId);
    },
    copyBillingToShip() {
    
        this.card.ship_first_name = this.card.bill_first_name
        this.card.ship_last_name = this.card.bill_last_name
        this.card.ship_company = this.card.bill_company
        this.card.ship_address = this.card.bill_address
        this.card.ship_city = this.card.bill_city
        this.card.ship_state = this.card.bill_state
        this.card.ship_zip = this.card.bill_zip
        this.card.ship_country = this.card.bill_country
    },
    createImage(file, targetId) {
      this.check.check_back_file =file
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
      if (targetId==='frontFile'){
        vm.check.check_front = e.target.result
      }else{
        vm.check.check_back = e.target.result
      }
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.check.check_back = '';
    }

  }
}
</script>