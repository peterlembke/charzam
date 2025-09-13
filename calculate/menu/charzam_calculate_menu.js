/**
 * charzam_calculate_menu
 * Render a menu for charzam_calculate
 *
 * @package     Infohub
 * @subpackage  charzam_calculate_menu
 * @since       2018-04-15
 * @author      Peter Lembke <info@infohub.se>
 * @license     GPL-3.0-or-later
 * @copyright   Copyright (C) 2010- Peter Lembke
 */
function charzam_calculate_menu() {

    'use strict';

// include "infohub_base.js"

    const _Version = function() {
        return {
            'date': '2019-07-07',
            'since': '2018-04-15',
            'version': '2.0.0',
            'checksum': '{{checksum}}',
            'class_name': 'charzam_calculate_menu',
            'note': 'Render a menu for charzam_calculate',
            'status': 'normal',
            'SPDX-License-Identifier': 'GPL-3.0-or-later',
        };
    };

    const _GetCmdFunctions = function() {
        const $list = {
            'create': 'normal',
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
     * @version 2016-10-16
     * @since   2016-10-16
     * @author  Peter Lembke
     */
    $functions.push('create');
    const create = function($in = {}) {

        if ($isCollectingInformation === true) {
            $functionInfoLookup['create'] = {
                description: 'Get instructions and create the message to InfoHub View',
                parameters: {
                    'subtype': {
                        type: 'string',
                        default: 'menu',
                        description: 'Subtype to create'
                    },
                    'parent_box_id': {
                        type: 'string',
                        default: '',
                        description: 'Parent box ID'
                    },
                    'translations': {
                        type: 'array',
                        default: {},
                        description: 'Translation data'
                    }
                }
            };
            return [];
        }

        const $default = {
            'subtype': 'menu',
            'parent_box_id': '',
            'translations': {},
            'step': 'step_start',
            'response': {
                'answer': 'false',
                'message': 'Nothing to report from tools_encrypt',
            },
        };
        $in = _Default($default, $in);

        if ($in.step === 'step_start') {
            $classTranslations = $in.translations;
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
                            'data': 'Calculations in economy',
                        },
                        'my_menu': {
                            'plugin': 'infohub_rendermenu',
                            'type': 'menu',
                            'head_label': '[titel]',
                            'options': {
                                'checksum': {
                                    'alias': 'interest_link',
                                    'event_data': 'interest',
                                    'button_label': _Translate('MONTHLY_INTEREST_RATE'),
                                    'to_plugin': 'charzam_calculate',
                                    'to_function': 'click_menu',
                                },
                            },
                        },
                    },
                    'how': {
                        'mode': 'one box',
                        'text': '[my_menu]',
                    },
                    'where': {
                        'box_id': $in.parent_box_id + '.menu',
                        'max_width': 320,
                        'scroll_to_box_id': 'true',
                    },
                    'cache_key': 'menu',
                },
                'data_back': {'step': 'step_end'},
            });
        }

        return {
            'answer': $in.response.answer,
            'message': $in.response.message,
        };
    };
}

//# sourceURL=charzam_calculate_menu.js