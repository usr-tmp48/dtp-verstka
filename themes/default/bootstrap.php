<?php
/**
 * Theme bootstrap file. 48888
 */
Yii::app()->getComponent('bootstrap');

Yii::app()->getClientScript()->registerScript('baseUrl', "var baseUrl = '" . Yii::app()->getBaseUrl(true) . "';", CClientScript::POS_HEAD);
$address=preg_replace('/<span>[a-zA-Zа-яА-Я\\s,\\d\\.]+<\\/span>/u', '', Yii::app()->getModule('yupe')->siteAddress, -1, $count);
Yii::app()->getClientScript()->registerScript('map-scheme', "var scheme_address = '" . $address . "';", CClientScript::POS_HEAD);
Yii::app()->getClientScript()->registerLinkTag('shortcut icon', null, Yii::app()->getTheme()->getAssetsUrl() . '/images/favicon.ico');
Yii::import('themes.'.Yii::app()->theme->name.'.DefautThemeEvents');
Yii::import('themes.'.Yii::app()->theme->name.'.DefautThemeEvents'); 