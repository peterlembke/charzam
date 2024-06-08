/**
 Copyright (C) 2010- Peter Lembke, CharZam soft
 the program is distributed under the terms of the GNU General Public License

 InfoHub is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 InfoHub is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with InfoHub.  If not, see <https://www.gnu.org/licenses/>.'
 */
function charzam_calculate_interest() {

    'use strict';

// include "infohub_base.js"

    const _Version = function() {
        return {
            'date': '2024-06-07',
            'since': '2024-06-07',
            'version': '1.0.0',
            'checksum': '{{checksum}}',
            'class_name': 'charzam_calculate_interest',
            'note': 'Render a form for generating interests',
            'status': 'normal',
            'SPDX-License-Identifier': 'GPL-3.0-or-later',
        };
    };

    const _GetCmdFunctions = function() {
        const $list = {
            'create': 'normal',
            'click_handle_interest': 'normal',
        };

        return _GetCmdFunctionsBase($list);
    };

    let $classTranslations = {};

    // ***********************************************************
    // * your class functions below, only declare with var
    // * Can only be reached through cmd()
    // ***********************************************************

    /**
     * Get instructions and create the message to InfoHub View
     * @version 2024-06-07
     * @since   2024-06-07
     * @author  Peter Lembke
     */
    $functions.push('create');
    const create = function($in = {}) {
        const $default = {
            'subtype': 'menu',
            'parent_box_id': '',
            'translations': {},
            'step': 'step_start',
            'response': {
                'answer': 'false',
                'message': 'Nothing to report from tools_interest',
            },
        };
        $in = _Default($default, $in);

        const $size = '1';
        let $text = [];

        if ($in.step === 'step_start') {
            $classTranslations = $in.translations;

            $text[0] = _Translate('YOU_CAN_CALCULATE_THE_MONTHLY_INTEREST_RATE_ON_YOUR_SAVINGS_FROM_THE_YEARLY_INTEREST_RATE.');
            $text[1] = _Translate('YOU_CAN_USE_THE_RESULT_IN_YOUR_BUDGET_TO_ADD_BANK_INTEREST_ON_YOUR_SAVINGS_EACH_MONTH.');
            $text[1] = _Translate('THAT_SOLVES_THE_PROBLEM_WITH_INTEREST_ON_INTEREST.');
            $text[2] = _Translate('IF_YOU_CALCULATE_MONTHLY_LOAN_INTEREST_THEN_DO_NOT_USE_THIS_TOOL.');
            $text[3] = _Translate('FOR_LOANS_YOU_DIVIDE_THE_YEARLY_INTEREST_RATE_BY_12.');
            $text[4] = _Translate('DIFFERENCE_IS_THAT_LOANS_DO_NOT_HAVE_INTEREST_ON_INTEREST.');

            return _SubCall({
                'to': {
                    'node': 'client',
                    'plugin': 'infohub_render',
                    'function': 'create',
                },
                'data': {
                    'what': {
                        'titel': {
                            'type': 'common',
                            'subtype': 'value',
                            'data': _Translate('INTEREST')
                        },
                        'my_presentation_box': {
                            'plugin': 'infohub_rendermajor',
                            'type': 'presentation_box',
                            'head_label': _Translate('CLICK_FOR_INSTRUCTIONS...'),
                            'content_data': '[i][ingress][/i]',
                            'open': 'false',
                        },
                        'ingress': {
                            'type': 'common',
                            'subtype': 'value',
                            'data': $text.join('<br>'),
                        },
                        'my_form': {
                            'plugin': 'infohub_renderform',
                            'type': 'form',
                            'content': '[my_textbox_input]<br>[my_submit_button]<br>[my_textbox_output_percent]<br>[my_textbox_output_decimal]<br>[my_status]',
                            'label': _Translate('INTEREST'),
                            'description': _Translate('CALCULATE_MONTHLY_INTEREST_RATE_ON_YOUR_SAVINGS'),
                        },
                        'my_textbox_input': {
                            'type': 'form',
                            'subtype': 'text',
                            'input_type': 'text',
                            'placeholder': _Translate('YEARLY_INTEREST_RATE'),
                            'class': 'text',
                            'css_data': {},
                            'validator_plugin': 'infohub_validate',
                            'validator_function': 'validate_has_data',
                        },
                        'my_submit_button': {
                            'plugin': 'infohub_renderform',
                            'type': 'button',
                            'mode': 'submit',
                            'button_label': _Translate('CALCULATE'),
                            'event_data': 'interest|handle_interest',
                            'to_plugin': 'charzam_calculate',
                            'to_function': 'click',
                        },
                        'my_textbox_output_percent': {
                            'plugin': 'infohub_renderform',
                            'type': 'text',
                            'label': _Translate('MONTHLY_INTEREST_RATE_PERCENT'),
                            'description': _Translate('MONTHLY_INTEREST_RATE_PERCENT_WITH_TWO_DECIMALS'),
                            'placeholder': _Translate('MONTHLY_INTEREST_RATE_PERCENT'),
                            'class': 'text',
                            'css_data': {},
                        },
                        'my_textbox_output_decimal': {
                            'plugin': 'infohub_renderform',
                            'type': 'text',
                            'label': _Translate('MONTHLY_INTEREST_RATE_DECIMAL'),
                            'description': _Translate('MONTHLY_INTEREST_RATE_DECIMAL_WITH_ALL_DECIMALS_FOR_YOUR_BUGDET'),
                            'placeholder': _Translate('MONTHLY_INTEREST_RATE_DECIMAL'),
                            'class': 'text',
                            'css_data': {},
                        },
                        'my_status': {
                            'plugin': 'infohub_renderstatus',
                            'type': 'status',
                            'head_label': '', //'[title]',
                            'show': 'calculation_failed',
                            'options': {
                                'calculation_ok': {
                                    'label': _Translate('CALCULATION_OK'),
                                    'description': _Translate('CALCULATION_VERIFIED_OK'),
                                },
                                'calculation_failed': {
                                    'label': _Translate('CALCULATION_FAILED'),
                                    'description': _Translate('CALCULATION_FAILED_VERIFICATION'),
                                },
                            },
                        },

                    },
                    'how': {
                        'mode': 'one box',
                        'text': '[h1][titel][/h1][my_presentation_box][my_form]',
                    },
                    'where': {
                        'box_id': $in.parent_box_id + '.tools',
                        'max_width': 100,
                        'scroll_to_box_id': 'true',
                    },
                    'cache_key': 'interest',
                },
                'data_back': {'step': 'step_end'},
            });
        }

        return {
            'answer': $in.response.answer,
            'message': $in.response.message,
        };
    };

    /**
     * Calculates the monthly interest rate from the yearly interest rate
     * If you enter with a comma you get the result with a comma.
     *
     * @version 2024-06-08
     * @since   2024-06-07
     * @author  Peter Lembke
     */
    $functions.push('click_handle_interest');
    const click_handle_interest = function($in = {}) {
        let $formData = {};

        const $default = {
            'step': 'step_start',
            'form_data': {},
            'response': {
                'answer': 'false',
                'message': '',
                'interest': '',
            },
            'box_id': ''
        };
        $in = _Default($default, $in);

        if ($in.step === 'step_start') {

            let $input = _GetData({
                'name': 'form_data/my_textbox_input/value',
                'default': '',
                'data': $in,
            });

            const $isDecimalComma = $input.includes(',');
            if ($isDecimalComma) {
                $input = $input.replace(',', '.');
            }

            const $annualRate = $input / 100.0;
            const $monthlyRate = Math.pow(1 + $annualRate, 1/12) - 1;
            const $monthlyRatePercent = $monthlyRate * 100;
            let $monthlyRatePercentString = $monthlyRatePercent.toFixed(2).toString();
            let $monthlyRateDecimal = 1 + $monthlyRate;
            let $monthlyRateDecimalString = $monthlyRateDecimal.toString();

            // Multiply $monthlyRate with itself 12 times to get the yearly interest rate
            let $rateCheck = $monthlyRateDecimal;
            for (let $monthNumber = 1; $monthNumber <= 11; $monthNumber++) {
                $rateCheck = $rateCheck * $monthlyRateDecimal;
            }

            $rateCheck = $rateCheck - 1; // We can now compare with the annual rate

            const $isRateCheckOK = Math.abs($rateCheck - $annualRate) < 0.0000001;

            if ($isDecimalComma) {
                $monthlyRatePercentString = $monthlyRatePercentString.replace('.', ',');
                $monthlyRateDecimalString = $monthlyRateDecimalString.replace('.', ',');
            }

            $formData = {
                'my_textbox_output_percent': {'value': $monthlyRatePercentString },
                'my_textbox_output_decimal': {'value': $monthlyRateDecimalString },
            };

            const $boxAlias = $isRateCheckOK ? 'calculation_ok' : 'calculation_failed';
            const $boxId = $in.box_id + '_my_status_options_' + $boxAlias;

            const $messageOut = _SubCall({
                'to': {
                    'node': 'client',
                    'plugin': 'infohub_renderstatus',
                    'function': 'event_message',
                },
                'data': {
                    'box_id': $boxId,
                    'message': $boxAlias,
                },
                'data_back': {
                    'step': 'void',
                },
            });

            return _SubCall({
                'to': {
                    'node': 'client',
                    'plugin': 'infohub_view',
                    'function': 'form_write',
                },
                'data': {
                    'id': 'main.body.charzam_calculate.tools',
                    'form_data': $formData,
                },
                'data_back': {
                    'step': 'step_end',
                },
                'messages': [$messageOut]
            });
        }

        return {
            'answer': $in.response.answer,
            'message': $in.response.message,
            'ok': $in.response.answer
        };
    };
}

//# sourceURL=charzam_calculate_interest.js