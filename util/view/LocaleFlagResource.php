<?php

class LocaleFlagResource
{
	/**
	 * Locale Flag
	 */
	public function getFlagResource($locale)
	{
			$resource = "";
			
			switch($locale)
			{
				
			case "_AF":
				$resource = "themes/babelium/images/flags/flag_afghanistan.png";
				break;
			case "_AL":
				$resource = "themes/babelium/images/flags/flag_albania.png";
				break;
			case "_DZ":
				$resource = "themes/babelium/images/flags/flag_algeria.png";
				break;
			case "_AS":
				$resource = "themes/babelium/images/flags/flag_american_samoa.png";
				break;
			case "_AD":
				$resource= "themes/babelium/images/flags/flag_andorra.png";
				break;
			case "_AO":
				$resource = "themes/babelium/images/flags/flag_angola.png";
				break;
			case "_AI":
				$resource = "themes/babelium/images/flags/flag_anguilla.png";
				break;
			case "_AG":
				$resource = "themes/babelium/images/flags/flag_antigua_and_barbuda.png";
				break;
			case "es_AR":
				$resource = "themes/babelium/images/flags/flag_argentina.png";
				break;
			case "_AM":
				$resource = "themes/babelium/images/flags/flag_armenia.png";
				break;
			case "_AW":
				$resource = "themes/babelium/images/flags/flag_aruba.png";
				break;
			case "en_AU":
				$resource = "themes/babelium/images/flags/flag_australia.png";
				break;
			case "_AT":
				$resource = "themes/babelium/images/flags/flag_austria.png";
				break;
			case "_AZ":
				$resource = "themes/babelium/images/flags/flag_azerbaijan.png";
				break;
			case "_BS":
				$resource = "themes/babelium/images/flags/flag_bahamas.png";
				break;
			case "_BH":
				$resource = "themes/babelium/images/flags/flag_bahrain.png";
				break;
			case "_BD":
				$resource = "themes/babelium/images/flags/flag_bangladesh.png";
				break;
			case "_BB":
				$resource = "themes/babelium/images/flags/flag_barbados.png";
				break;
			case "eu_ES":
				$resource = "themes/babelium/images/flags/flag_basque_country.png";
				break;
			case "_BY":
				$resource = "themes/babelium/images/flags/flag_belarus.png";
				break;
			case "_BE":
				$resource = "themes/babelium/images/flags/flag_belgium.png";
				break;
			case "_BZ":
				$resource = "themes/babelium/images/flags/flag_belize.png";
				break;
			case "_BJ":
				$resource = "themes/babelium/images/flags/flag_benin.png";
				break;
			case "_BM":
				$resource = "themes/babelium/images/flags/flag_bermuda.png";
				break;
			case "_BT":
				$resource = "themes/babelium/images/flags/flag_bhutan.png";
				break;
			case "es_BO":
				$resource = "themes/babelium/images/flags/flag_bolivia.png";
				break;
			case "_BA":
				$resource = "themes/babelium/images/flags/flag_bosnia_and_herzegovina.png";
				break;
			case "_BW":
				$resource = "themes/babelium/images/flags/flag_botswana.png";
				break;
			case "pt_BR":
				$resource = "themes/babelium/images/flags/flag_brazil.png";
				break;
			case "_IO":
				$resource = "themes/babelium/images/flags/flag_british_indian_ocean_territory.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_british_virgin_islands.png";
			//	break;
			case "_BN":
				$resource = "themes/babelium/images/flags/flag_brunei.png";
				break;
			case "_BG":
				$resource = "themes/babelium/images/flags/flag_bulgaria.png";
				break;
			case "_BF":
				$resource = "themes/babelium/images/flags/flag_burkina_faso.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_burma.png";
			//	break;
			case "_BI":
				$resource = "themes/babelium/images/flags/flag_burundi.png";
				break;
			case "_KH":
				$resource = "themes/babelium/images/flags/flag_cambodia.png";
				break;
			case "_CM":
				$resource = "themes/babelium/images/flags/flag_cameroon.png";
				break;
			case "_CA":
				$resource = "themes/babelium/images/flags/flag_canada.png";
				break;
			case "_CV":
				$resource = "themes/babelium/images/flags/flag_cape_verde.png";
				break;
			case "_KY":
				$resource = "themes/babelium/images/flags/flag_cayman_islands.png";
				break;
			case "_CF":
				$resource = "themes/babelium/images/flags/flag_central_african_republic.png";
				break;
			case "_TD":
				$resource = "themes/babelium/images/flags/flag_chad.png";
				break;
			case "es_CL":
				$resource = "themes/babelium/images/flags/flag_chile.png";
				break;
			case "cn_CN":
				$resource = "themes/babelium/images/flags/flag_china.png";
				break;
			case "es_CO":
				$resource = "themes/babelium/images/flags/flag_colombia.png";
				break;
			case "_KM":
				$resource = "themes/babelium/images/flags/flag_comoros.png";
				break;
			case "_CG":
				$resource = "themes/babelium/images/flags/flag_congo.png";
				break;
			case "_CD":
				$resource = "themes/babelium/images/flags/flag_congo_republic.png";
				break;
			case "_CK":
				$resource = "themes/babelium/images/flags/flag_cook_islands.png";
				break;
			case "es_CR":
				$resource = "themes/babelium/images/flags/flag_costa_rica.png";
				break;
			case "_CI":
				$resource = "themes/babelium/images/flags/flag_cote_divoire.png";
				break;
			case "_HR":
				$resource = "themes/babelium/images/flags/flag_croatia.png";
				break;
			case "es_CU":
				$resource = "themes/babelium/images/flags/flag_cuba.png";
				break;
			case "_CY":
				$resource = "themes/babelium/images/flags/flag_cyprus.png";
				break;
			case "cz_CZ":
				$resource = "themes/babelium/images/flags/flag_czech_republic.png";
				break;
			case "_DK":
				$resource = "themes/babelium/images/flags/flag_denmark.png";
				break;
			case "_DJ":
				$resource = "themes/babelium/images/flags/flag_djibouti.png";
				break;
			case "es_DO":
				$resource = "themes/babelium/images/flags/flag_dominican_republic.png";
				break;
			case "_DM":
				$resource = "themes/babelium/images/flags/flag_dominica.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_east_timor.png";
			//	break;
			case "es_EC":
				$resource = "themes/babelium/images/flags/flag_ecuador.png";
				break;
			case "_EG":
				$resource = "themes/babelium/images/flags/flag_egypt.png";
				break;
			case "es_SV":
				$resource = "themes/babelium/images/flags/flag_el_salvador.png";
				break;
			case "":
				$resource = "themes/babelium/images/flags/flag_england.png";
				break;
			case "_GQ":
				$resource = "themes/babelium/images/flags/flag_equatorial_guinea.png";
				break;
			case "_ER":
				$resource = "themes/babelium/images/flags/flag_eritrea.png";
				break;
			case "_EE":
				$resource = "themes/babelium/images/flags/flag_estonia.png";
				break;
			case "_ET":
				$resource = "themes/babelium/images/flags/flag_ethiopia.png";
				break;
			case "_FK":
				$resource = "themes/babelium/images/flags/flag_falkland_islands.png";
				break;
			case "_FO":
				$resource = "themes/babelium/images/flags/flag_faroe_islands.png";
				break;
			case "_FJ":
				$resource = "themes/babelium/images/flags/flag_fiji.png";
				break;
			case "fi_FI":
				$resource = "themes/babelium/images/flags/flag_finland.png";
				break;
			case "fr_FR":
				$resource = "themes/babelium/images/flags/flag_france.png";
				break;
			case "_PF":
				$resource = "themes/babelium/images/flags/flag_french_polynesia.png";
				break;
			case "_GA":
				$resource = "themes/babelium/images/flags/flag_gabon.png";
				break;
			case "_GM":
				$resource = "themes/babelium/images/flags/flag_gambia.png";
				break;
			case "_GE":
				$resource = "themes/babelium/images/flags/flag_georgia.png";
				break;
			case "de_DE":
				$resource = "themes/babelium/images/flags/flag_germany.png";
				break;
			case "_GH":
				$resource = "themes/babelium/images/flags/flag_ghana.png";
				break;
			case "_GI":
				$resource = "themes/babelium/images/flags/flag_gibraltar.png";
				break;
			case "el_GR":
				$resource = "themes/babelium/images/flags/flag_greece.png";
				break;
			case "_GL":
				$resource = "themes/babelium/images/flags/flag_greenland.png";
				break;
			case "_GD":
				$resource = "themes/babelium/images/flags/flag_grenada.png";
				break;
			case "_GU":
				$resource = "themes/babelium/images/flags/flag_guam.png";
				break;
			case "es_GT":
				$resource = "themes/babelium/images/flags/flag_guatemala.png";
				break;
			case "_GG":
				$resource = "themes/babelium/images/flags/flag_guernsey.png";
				break;
			case "_GW":
				$resource = "themes/babelium/images/flags/flag_guinea_bissau.png";
				break;
			case "_GN":
				$resource = "themes/babelium/images/flags/flag_guinea.png";
				break;
			case "_GY":
				$resource = "themes/babelium/images/flags/flag_guyana.png";
				break;
			case "en_HT":
				$resource = "themes/babelium/images/flags/flag_haiti.png";
				break;
			case "es_HN":
				$resource = "themes/babelium/images/flags/flag_honduras.png";
				break;
			case "_HK":
				$resource = "themes/babelium/images/flags/flag_hong_kong.png";
				break;
			case "_HU":
				$resource = "themes/babelium/images/flags/flag_hungary.png";
				break;
			case "is_IS":
				$resource = "themes/babelium/images/flags/flag_iceland.png";
				break;
			case "_IN":
				$resource = "themes/babelium/images/flags/flag_india.png";
				break;
			case "_ID":
				$resource = "themes/babelium/images/flags/flag_indonesia.png";
				break;
			case "_IR":
				$resource = "themes/babelium/images/flags/flag_iran.png";
				break;
			case "_IQ":
				$resource = "themes/babelium/images/flags/flag_iraq.png";
				break;
			case "_IE":
				$resource = "themes/babelium/images/flags/flag_ireland.png";
				break;
			case "_IM":
				$resource = "themes/babelium/images/flags/flag_isle_of_man.png";
				break;
			case "he_IL":
				$resource = "themes/babelium/images/flags/flag_israel.png";
				break;
			case "it_IT":
				$resource = "themes/babelium/images/flags/flag_italy.png";
				break;
			case "en_JM":
				$resource = "themes/babelium/images/flags/flag_jamaica.png";
				break;
			case "jp_JP":
				$resource = "themes/babelium/images/flags/flag_japan.png";
				break;
			case "_JE":
				$resource = "themes/babelium/images/flags/flag_jersey.png";
				break;
			case "_JO":
				$resource = "themes/babelium/images/flags/flag_jordan.png";
				break;
			case "_KZ":
				$resource = "themes/babelium/images/flags/flag_kazakhstan.png";
				break;
			case "_KE":
				$resource = "themes/babelium/images/flags/flag_kenya.png";
				break;
			case "_KI":
				$resource = "themes/babelium/images/flags/flag_kiribati.png";
				break;
			case "_KW":
				$resource = "themes/babelium/images/flags/flag_kuwait.png";
				break;
			case "_KG":
				$resource = "themes/babelium/images/flags/flag_kyrgyzstan.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_laos.png";
			//	break;
			case "_LV":
				$resource = "themes/babelium/images/flags/flag_latvia.png";
				break;
			case "_LB":
				$resource = "themes/babelium/images/flags/flag_lebanon.png";
				break;
			case "_LS":
				$resource = "themes/babelium/images/flags/flag_lesotho.png";
				break;
			case "_LR":
				$resource = "themes/babelium/images/flags/flag_liberia.png";
				break;
			case "_LY":
				$resource = "themes/babelium/images/flags/flag_libya.png";
				break;
			case "_LI":
				$resource = "themes/babelium/images/flags/flag_liechtenstein.png";
				break;
			case "_LT":
				$resource = "themes/babelium/images/flags/flag_lithuania.png";
				break;
			case "_LU":
				$resource = "themes/babelium/images/flags/flag_luxembourg.png";
				break;
			case "_MO":
				$resource = "themes/babelium/images/flags/flag_macau.png";
				break;
			case "_MK":
				$resource = "themes/babelium/images/flags/flag_macedonia.png";
				break;
			case "_MG":
				$resource = "themes/babelium/images/flags/flag_madagascar.png";
				break;
			case "_MW":
				$resource = "themes/babelium/images/flags/flag_malawi.png";
				break;
			case "_MY":
				$resource = "themes/babelium/images/flags/flag_malaysia.png";
				break;
			case "_MV":
				$resource = "themes/babelium/images/flags/flag_maledives.png";
				break;
			case "_ML":
				$resource = "themes/babelium/images/flags/flag_mali.png";
				break;
			case "_MT":
				$resource = "themes/babelium/images/flags/flag_malta.png";
				break;
			case "_MH":
				$resource = "themes/babelium/images/flags/flag_marshall_islands.png";
				break;
			case "_MQ":
				$resource = "themes/babelium/images/flags/flag_martinique.png";
				break;
			case "_MR":
				$resource = "themes/babelium/images/flags/flag_mauretania.png";
				break;
			case "_MU":
				$resource = "themes/babelium/images/flags/flag_mauritius.png";
				break;
			case "es_MX":
				$resource = "themes/babelium/images/flags/flag_mexico.png";
				break;
			case "_FM":
				$resource = "themes/babelium/images/flags/flag_micronesia.png";
				break;
			case "_MD":
				$resource = "themes/babelium/images/flags/flag_moldova.png";
				break;
			case "_MC":
				$resource = "themes/babelium/images/flags/flag_monaco.png";
				break;
			case "_MN":
				$resource = "themes/babelium/images/flags/flag_mongolia.png";
				break;
			case "_MS":
				$resource = "themes/babelium/images/flags/flag_montserrat.png";
				break;
			case "_MA":
				$resource = "themes/babelium/images/flags/flag_morocco.png";
				break;
			case "_MZ":
				$resource = "themes/babelium/images/flags/flag_mozambique.png";
				break;
			case "_NA":
				$resource = "themes/babelium/images/flags/flag_namibia.png";
				break;
			case "_NR":
				$resource = "themes/babelium/images/flags/flag_nauru.png";
				break;
			case "_NP":
				$resource = "themes/babelium/images/flags/flag_nepal.png";
				break;
			case "_AN":
				$resource = "themes/babelium/images/flags/flag_netherlands_antilles.png";
				break;
			case "_NL":
				$resource = "themes/babelium/images/flags/flag_netherlands.png";
				break;
			case "en_NZ":
				$resource = "themes/babelium/images/flags/flag_new_zealand.png";
				break;
			case "es_NI":
				$resource = "themes/babelium/images/flags/flag_nicaragua.png";
				break;
			case "_NG":
				$resource = "themes/babelium/images/flags/flag_nigeria.png";
				break;
			case "_NE":
				$resource = "themes/babelium/images/flags/flag_niger.png";
				break;
			case "_NU":
				$resource = "themes/babelium/images/flags/flag_niue.png";
				break;
			case "_NF":
				$resource = "themes/babelium/images/flags/flag_norfolk_island.png";
				break;
			case "_MP":
				$resource = "themes/babelium/images/flags/flag_northern_mariana_islands.png";
				break;
			case "_KP":
				$resource = "themes/babelium/images/flags/flag_north_korea.png";
				break;
			case "no_NO":
				$resource = "themes/babelium/images/flags/flag_norway.png";
				break;
			case "_OM":
				$resource = "themes/babelium/images/flags/flag_oman.png";
				break;
			case "_PK":
				$resource = "themes/babelium/images/flags/flag_pakistan.png";
				break;
			case "_PW":
				$resource = "themes/babelium/images/flags/flag_palau.png";
				break;
			case "_PA":
				$resource = "themes/babelium/images/flags/flag_panama.png";
				break;
			case "_PG":
				$resource = "themes/babelium/images/flags/flag_papua_new_guinea.png";
				break;
			case "_PY":
				$resource = "themes/babelium/images/flags/flag_paraguay.png";
				break;
			case "es_PE":
				$resource = "themes/babelium/images/flags/flag_peru.png";
				break;
			case "_PH":
				$resource = "themes/babelium/images/flags/flag_philippines.png";
				break;
			case "_PN":
				$resource = "themes/babelium/images/flags/flag_pitcairn_islands.png";
				break;
			case "pl_PL":
				$resource = "themes/babelium/images/flags/flag_poland.png";
				break;
			case "pt_PT":
				$resource = "themes/babelium/images/flags/flag_portugal.png";
				break;
			case "_PR":
				$resource = "themes/babelium/images/flags/flag_puerto_rico.png";
				break;
			case "_QA":
				$resource = "themes/babelium/images/flags/flag_qatar.png";
				break;
			case "_RO":
				$resource = "themes/babelium/images/flags/flag_romania.png";
				break;
			case "ru_RU":
				$resource = "themes/babelium/images/flags/flag_russia.png";
				break;
			case "_RW":
				$resource = "themes/babelium/images/flags/flag_rwanda.png";
				break;
			case "_SH":
				$resource = "themes/babelium/images/flags/flag_saint_helena.png";
				break;
			case "_KN":
				$resource = "themes/babelium/images/flags/flag_saint_kitts_and_nevis.png";
				break;
			case "_LC":
				$resource = "themes/babelium/images/flags/flag_saint_lucia.png";
				break;
			case "_PM":
				$resource = "themes/babelium/images/flags/flag_saint_pierre_and_miquelon.png";
				break;
			case "_VC":
				$resource = "themes/babelium/images/flags/flag_saint_vincent_and_the_grenadines.png";
				break;
			case "_WS":
				$resource = "themes/babelium/images/flags/flag_samoa.png";
				break;
			case "_SM":
				$resource = "themes/babelium/images/flags/flag_san_marino.png";
				break;
			case "_ST":
				$resource = "themes/babelium/images/flags/flag_sao_tome_and_principe.png";
				break;
			case "_SA":
				$resource = "themes/babelium/images/flags/flag_saudi_arabia.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_scotland.png";
			//	break;
			case "_SN":
				$resource = "themes/babelium/images/flags/flag_senegal.png";
				break;
			case "_RS":
				$resource = "themes/babelium/images/flags/flag_serbia_montenegro.png";
				break;
			case "_SC":
				$resource = "themes/babelium/images/flags/flag_seychelles.png";
				break;
			case "_SL":
				$resource = "themes/babelium/images/flags/flag_sierra_leone.png";
				break;
			case "_SG":
				$resource = "themes/babelium/images/flags/flag_singapore.png";
				break;
			case "_SK":
				$resource = "themes/babelium/images/flags/flag_slovakia.png";
				break;
			case "_SI":
				$resource = "themes/babelium/images/flags/flag_slovenia.png";
				break;
			case "_SB":
				$resource = "themes/babelium/images/flags/flag_solomon_islands.png";
				break;
			case "_SO":
				$resource = "themes/babelium/images/flags/flag_somalia.png";
				break;
			case "_ZA":
				$resource = "themes/babelium/images/flags/flag_south_africa.png";
				break;
			case "_GS":
				$resource = "themes/babelium/images/flags/flag_south_georgia.png";
				break;
			case "kr_KR":
				$resource = "themes/babelium/images/flags/flag_south_korea.png";
				break;
			case "es_ES":
				$resource = "themes/babelium/images/flags/flag_spain.png";
				break;
			case "_LK":
				$resource = "themes/babelium/images/flags/flag_sri_lanka.png";
				break;
			case "_SD":
				$resource = "themes/babelium/images/flags/flag_sudan.png";
				break;
			case "_SR":
				$resource = "themes/babelium/images/flags/flag_suriname.png";
				break;
			case "_SZ":
				$resource = "themes/babelium/images/flags/flag_swaziland.png";
				break;
			case "_SE":
				$resource = "themes/babelium/images/flags/flag_sweden.png";
				break;
			case "_CH":
				$resource = "themes/babelium/images/flags/flag_switzerland.png";
				break;
			case "_SY":
				$resource = "themes/babelium/images/flags/flag_syria.png";
				break;
			case "ch_TW":
				$resource = "themes/babelium/images/flags/flag_taiwan.png";
				break;
			case "_TJ":
				$resource = "themes/babelium/images/flags/flag_tajikistan.png";
				break;
			case "_TZ":
				$resource = "themes/babelium/images/flags/flag_tanzania.png";
				break;
			case "_TH":
				$resource = "themes/babelium/images/flags/flag_thailand.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_tibet.png";
			//	break;
			case "_TG":
				$resource = "themes/babelium/images/flags/flag_togo.png";
				break;
			case "_TO":
				$resource = "themes/babelium/images/flags/flag_tonga.png";
				break;
			case "_TT":
				$resource = "themes/babelium/images/flags/flag_trinidad_and_tobago.png";
				break;
			case "_TN":
				$resource = "themes/babelium/images/flags/flag_tunisia.png";
				break;
			case "_TR":
				$resource = "themes/babelium/images/flags/flag_turkey.png";
				break;
			case "_TM":
				$resource = "themes/babelium/images/flags/flag_turkmenistan.png";
				break;
			case "_TC":
				$resource = "themes/babelium/images/flags/flag_turks_and_caicos_islands.png";
				break;
			case "_TV":
				$resource = "themes/babelium/images/flags/flag_tuvalu.png";
				break;
			case "_UG":
				$resource = "themes/babelium/images/flags/flag_uganda.png";
				break;
			case "_UA":
				$resource = "themes/babelium/images/flags/flag_ukraine.png";
				break;
			case "_AE":
				$resource = "themes/babelium/images/flags/flag_united_arab_emirates.png";
				break;
			case "en_GB":
				$resource = "themes/babelium/images/flags/flag_united_kingdom.png";
				break;
			case "en_US":
				$resource = "themes/babelium/images/flags/flag_united_states.png";
				break;
			case "_UY":
				$resource = "themes/babelium/images/flags/flag_uruguay.png";
				break;
			case "_UZ":
				$resource = "themes/babelium/images/flags/flag_uzbekistan.png";
				break;
			case "_VU":
				$resource = "themes/babelium/images/flags/flag_vanuatu.png";
				break;
			case "_VA":
				$resource = "themes/babelium/images/flags/flag_vatican_city.png";
				break;
			case "_VE":
				$resource = "themes/babelium/images/flags/flag_venezuela.png";
				break;
			case "_VN":
				$resource = "themes/babelium/images/flags/flag_vietnam.png";
				break;
			case "_VI":
				$resource = "themes/babelium/images/flags/flag_virgin_islands.png";
				break;
			//case "":
			//	$resource = "themes/babelium/images/flags/flag_wales.png";
			//	break;
			case "_WF":
				$resource = "themes/babelium/images/flags/flag_wallis_and_futuna.png";
				break;
			case "_YE":
				$resource = "themes/babelium/images/flags/flag_yemen.png";
				break;
			case "_ZM":
				$resource = "themes/babelium/images/flags/flag_zambia.png";
				break;
			case "_ZW":
				$resource = "themes/babelium/images/flags/flag_zimbabwe.png";
				break;
			default:
				$resource = "themes/babelium/images/flags/flag_empty.png";
			}
			
			return $resource;
	}
}