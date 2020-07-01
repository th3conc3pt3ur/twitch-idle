<?php
require 'simple_html_dom.php';

$htmlMouse = file_get_html(__DIR__.'/gh.html');
//$htmlMouse = file_get_html("https://www.amazon.com/s?k=gaming+mouse");
$tabMouse = [];

//$htmlKeyboard = file_get_html("https://www.amazon.com/s?k=gaming+keyboard");
$htmlKeyboard = file_get_html(__DIR__."/keyboard.html");

//$htmlGc = file_get_html("https://www.amazon.com/s?k=gaming+graphics+card");
$htmlGc = file_get_html(__DIR__."/cg.html");
$tabGc = [];

    
foreach ($htmlMouse->find('div.s-main-slot.s-result-list.s-search-results.sg-row > div') as $element) {
    $img = $element->find('img.s-image', 0);
    $price = $element->find('span.a-offscreen', 0);
    if($price != null && $img != null) {
        if($img->alt != "") {
            $tabMouse[] = array('name' => trim($img->alt),'src' => $img->src,'price' => ($price == null ? "" : $price->text()));
        }
    }
}

foreach ($htmlKeyboard->find('div.s-main-slot.s-result-list.s-search-results.sg-row > div') as $element) {
    $img = $element->find('img.s-image', 0);
    $price = $element->find('span.a-offscreen', 0);
    if($price != null && $img != null) {
        if($img->alt != "") {
            $tabKeyboard[] = array('name' => trim($img->alt),'src' => $img->src,'price' => ($price == null ? "" : $price->text()));
        }
    }
}foreach ($htmlGc->find('div.s-main-slot.s-result-list.s-search-results.sg-row > div') as $element) {
    $img = $element->find('img.s-image', 0);
    $price = $element->find('span.a-offscreen', 0);
    if($price != null && $img != null) {
        if($img->alt != "") {
            $tabGc[] = array('name' => trim($img->alt),'src' => $img->src,'price' => ($price == null ? "" : $price->text()));
        }
    }
}

function cmpPrice($a, $b)
{
    $priceA = str_replace("$","",$a['price']);
    $priceB = str_replace("$","",$b['price']);
    if ($priceA > $priceB) {
        return 1;
    }
    else {
        return -1;
    }
}

usort($tabMouse,"cmpPrice");
usort($tabKeyboard,"cmpPrice");
usort($tabGc,"cmpPrice");
file_put_contents(__DIR__.'/../public/data/mouse.json',json_encode($tabMouse,JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/../public/data/keyboard.json',json_encode($tabKeyboard,JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/../public/data/graphic_card.json',json_encode($tabGc,JSON_PRETTY_PRINT));