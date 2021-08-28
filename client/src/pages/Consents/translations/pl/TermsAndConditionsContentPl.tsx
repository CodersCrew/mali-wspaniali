import { Box, Link, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { DownloadIcon } from '../../../../components/Icons/DownloadIcon';

export const TermsAndConditionsContentPl = () => {
    const { t } = useTranslation();

    return (
        <Box style={{ wordWrap: 'break-word' }}>
            <Typography variant="h3" align="center">
                <strong>Regulamin Platformy Mali Wspaniali</strong>
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1" align="center">
                <strong>§1</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>DEFINICJE</strong>
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Fundacja</strong> – Fundacja Mali Wspaniali z siedzibą ul. Ślężna 2-24; (kod pocztowy: 53- 302)
                we Wrocławiu, wpisana do rejestru KRS pod numerem 00000533789, e-mail: fundacja@mali-wspaniali.pl.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Program Mali Wspaniali / Program</strong> – program zajęć ogólnorozwojowych prowadzony w
                placówkach edukacyjnych dla dzieci w wieku przedszkolnym i wczesnoszkolnym, wraz z pomiarami testów
                sprawności oraz innych aspektów rozwojowych uczestników.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Platforma/Aplikacja Mali Wspaniali</strong> – rozwiązanie organizacyjne i informatyczne dostępne
                w domenie ……….. służące m. in. do gromadzenia koniecznych zgód na udział dzieci w programie zajęć
                sportowych prowadzonych w ramach Programu Mali Wspaniali w placówkach, gromadzenia i analizowania danych
                dotyczących pomiarów uczestników programu i wyników testów sprawności, dostarczające treści
                edukacyjnych, między innymi, na temat prawidłowego rozwoju dzieci w wieku przedszkolnym i
                wczesnoszkolnym. Dostęp do danych wprowadzonych do Aplikacji posiadają wyłącznie zarejestrowani i
                uwierzytelnieni Użytkownicy w zakresie odpowiadającym uprawnieniom charakterystycznym dla rodzaju konta
                dla: Rodzica/ Opiekuna Prawnego, instruktora lub administratora w formie i zakresie zgodnym z wymogami
                obowiązującego w Polsce prawa oraz w zgodzie z przepisami dotyczącymi przetwarzania danych osobowych.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Usługa</strong> – udostępnianie Użytkownikom przez Fundację danych zapisanych w Aplikacji,
                informacji o wymaganych zgodach w Programie Mali Wspaniali, wynikach pomiarów testów sprawności oraz
                poziomu sprawności uczestników Programu na koniec testów, udostępnianie treści edukacyjnych i
                eksperckich dotyczących rozwoju dzieci, przesyłanie treści droga elektroniczną, udostępnianie innych
                funkcjonalności Aplikacji, a także umożliwienie Użytkownikom o odpowiednich uprawnieniach wprowadzania,
                modyfikacji lub usuwania danych zapisanych w Aplikacji (np.: instruktor).
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Użytkownik</strong> – osoba, która w jakikolwiek sposób korzysta z Aplikacji przy pomocy
                utworzonego dla niej/ siebie konta. Rodzaje kont różnią się m. in. zakresem uprawnień do dostępu,
                wprowadzania, modyfikacji lub usuwania danych wprowadzonych do Aplikacji. Użytkownikami są Rodzice/
                Opiekunowie Prawni dzieci uczęszczających do placówek edukacyjnych, w których realizowany jest Program
                Mali Wspaniali, i którzy zaakceptowali zgodę na uczestnictwo dziecka w programie zawartą w Aplikacji,
                instruktorzy prowadzący zajęcia z dziećmi w placówkach, które wdrożyły Program Mali Wspaniali,
                uprawnione przez Fundację osoby pełniące rolę Administratora Platformy. W ramach jednego konta mogą być
                wpisane wszystkie dzieci Rodzica/ Opiekuna Prawnego uczestniczące w Programie, niezależnie od wieku,
                natomiast konto może założyć jeden Rodzic/ Opiekun Prawny.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Przedszkole/Placówka</strong> – każda placówka edukacyjna, która wdrożyła Program Mali Wspaniali
                na podstawie umowy podpisanej z Fundacją lub placówka, na rzecz której umowę podpisał jej organ
                prowadzący lub instytucja nadzorująca prywatna/ państwowa, na mocy której wdrożyła Program i korzysta z
                Aplikacji.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Organ Prowadzący/ Instytucja Nadzorująca Placówkę</strong> – instytucja/ organizacja prywatna/
                publiczna lub państwowa, która nadzoruje, prowadzi placówki edukacyjne, podejmuje w ich imieniu
                zobowiązania.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Administrator Platformy</strong> – wyznaczona przez Fundację osoba administrująca Platformą/
                Aplikacją, odpowiedzialna za realizowanie usług, między innymi za: publikowanie wyników testów
                sprawności oraz innych aspektów rozwoju dzieci, zamieszczanie treści na Platformie (w tym artykułów
                edukacyjnych i eksperckich), przydzielanie i zarządzanie kontami Użytkowników z ramienia Fundacji, w tym
                usuwanie tych kont.
            </Typography>
            <Box mb="1rem" />
            <Typography variant="subtitle1">
                <strong>Regulamin</strong> – oznacza niniejszy regulamin określający zasady i warunki korzystania z
                Platformy/ Aplikacji, w tym prawa i obowiązki Użytkowników, Fundacji związane z korzystaniem z Platformy
                i świadczeniem za jej pośrednictwem Usług.
            </Typography>
            <Box mb="1rem" />

            <Typography variant="subtitle1" align="center">
                <strong>§2</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>POSTANOWIENIA WSTĘPNE, ZASADY AKCEPTACJI REGULAMINU</strong>
            </Typography>
            <Typography variant="subtitle1">
                <ol>
                    <li>
                        Niniejszy Regulamin określa zasady i warunki korzystania z Platformy/ Aplikacji. Każdy
                        Użytkownik zobowiązany jest, z momentem podjęcia czynności zmierzających do korzystania z
                        Platformy/Aplikacji, do zapoznania się z niniejszym Regulaminem, jego akceptacji i
                        przestrzegania jego postanowień.
                    </li>
                    <li>
                        Regulamin jest udostępniany nieodpłatnie, pod adresem http:// ……………. oraz jest prezentowany
                        podczas rejestracji użytkownika, a Użytkownik ma prawo w każdym czasie utrwalić jego treść (w
                        tym poprzez pobranie Regulaminu na swoje urządzenie końcowe w formacie PDF).
                    </li>
                    <li>
                        Fundacja świadczy Usługi dla każdego Rodzica/ Opiekuna Prawnego, który zaakceptował zgodę na
                        udział w Programie Mali Wspaniali swojego dziecka i które bierze udział w zajęciach w
                        przedszkolu w ramach Programu, każdego instruktora zatrudnionego do prowadzenia zajęć w
                        Programie.
                    </li>
                </ol>
            </Typography>
            <Box mb="1rem" />

            <Typography variant="subtitle1" align="center">
                <strong>§3</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>ZASADY FUNKCJONOWANIA PLATFORMY/APLIKACJI I APLIKACJI/ PLATFORMY</strong>
            </Typography>
            <Typography variant="subtitle1">
                <ol>
                    <li>
                        Aplikacja jest nowoczesnym, stale rozwijanym narzędziem informatycznym służącym m.in. Fundacji,
                        Rodzicom/ Opiekunom Prawnym, instruktorom przy realizacji Programu Mali Wspaniali. W Platformie
                        gromadzone są między innymi informacje na temat wymaganych zgód na udział w Programie, postępów
                        rozwoju sprawności fizycznej dzieci biorących udział w zajęciach, treści edukacyjne oraz
                        eksperckie na temat rozwoju dzieci wieku przedszkolnym i wczesnoszkolnym, a które następnie
                        udostępniane są Użytkownikom.
                    </li>
                    <li>
                        Fundacja działając na polecenie instytucji zlecającej prowadzenie programu (Organu Prowadzącego/
                        Instytucji Nadzorującej Placówkę) lub samego przedszkola, z którym ma podpisaną umowę, umożliwia
                        użytkownikom dostęp do Platformy/Aplikacji.
                    </li>
                    <li>
                        Użytkownik (Rodzic/Instruktor) dokonuje rejestracji w Aplikacji wykorzystując specjalny kod
                        przekazany przez dyrekcję placówki edukacyjnej lub Fundację/ Administratora oraz poprzez podanie
                        swojego adresu mailowego. Proces rejestracji kończy się w chwili, gdy Użytkownik użyje linku
                        aktywacyjnego otrzymanego na adres mailowy podany podczas rejestracji. Adres podany przy
                        rejestracji nie może zostać zmieniony w czasie użytkowania Aplikacji.
                    </li>
                    <li>
                        W zakres Usług dla Użytkownika Rodzica/ Opiekuna Prawnego wchodzą w szczególności:
                        <ol type="a">
                            <li>
                                umożliwienie wyrażenia zgody na udział w programie, przez co rozumie się między innymi
                                działania zawarte w definicji Programu w § 1, podczas procesu rejestracji na Platformie;
                            </li>
                            <li>
                                umożliwienie wyrażenia zgody marketingowej oraz zgody na wykorzystanie wizerunku dziecka
                                w ramach Programu Mali Wspaniali;
                            </li>
                            <li>
                                udostępnianie Rodzicom/ Opiekunom Prawnym zarejestrowanym w Aplikacji danych o
                                wyrażonych zgodach dotyczących dziecka biorącego udział w Programie Mali Wspaniali;
                            </li>
                            <li>
                                udostępnianie Rodzicom/ Opiekunom Prawnym zarejestrowanym na Platformie danych o
                                wynikach dziecka biorącego udział w teście sprawności i innych pomiarach w czasie
                                uczestniczenia w Programie;
                            </li>
                            <li>
                                umożliwienie Rodzicowi/ Opiekunowi Prawnemu wprowadzania i edytowania danych
                                identyfikacyjnych dziecka w Aplikacji/ Platformie dla prawidłowego obliczenia wyników
                                sprawności dziecka;
                            </li>
                            <li>
                                udostępnianie Rodzicowi/ Opiekunowi Prawnemu artykułów oraz innych treści eksperckich,
                                opublikowanych w Aplikacji;
                            </li>
                            <li>
                                przesyłanie wiadomości, komunikatów, ogłoszeń, i innych informacji związanych z
                                działalnością Fundacji użytkownikom, którzy wyrazili zgodę marketingową;
                            </li>
                            <li>
                                umożliwienie wysyłania wiadomości do fundacji, w szczególności Administratora Platformy,
                                za pomocą Platformy/Aplikacji oraz publikowanie przez Administratora lub Fundację
                                komunikatów związanych z funkcjonowaniem Platformy/Aplikacji;
                            </li>
                            <li>
                                anonimizację konta zarejestrowanego Rodzica/ Opiekuna Prawnego wraz z danymi osobowymi
                                dzieci (imieniem i nazwiskiem) po upływie co najmniej 5 lat od dnia rejestracji na
                                Platformie. Anonimizacja polega na trwałym usunięciu przez Aplikację danych konta, tj.:
                                adresu mailowego podanego przez Rodzica/ Opiekuna Prawnego przy rejestracji, imienia i
                                nazwiska dziecka/ci wpisanych przez Rodzica/ Opiekuna Prawnego a pozostawienie danych
                                związanych z pomiarami dziecka do celów statystycznych (tj.: wieku, płci, wyników
                                testów, numeru i/lub adresu placówki);
                            </li>
                            <li>
                                usunięcie konta wcześniej, niż zakończenie edukacji dziecka w placówce, na pisemną
                                prośbę przesłaną do Fundacji, pod warunkiem braku podstaw prawnych do dalszego
                                przetwarzania danych osobowych przez Fundację.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Odpowiedzialność za wprowadzenie do Platformy/Aplikacji danych, w szczególności dotyczących
                        imienia i nazwiska dziecka, płci, kwartału urodzenia oraz danych przedszkola, do którego
                        uczęszcza dziecko ponosi rodzic/opiekun prawny. Ponosi on pełną odpowiedzialność za poprawność,
                        kompletność, zgodność z prawdą i treść wprowadzanych danych. Nieprawidłowe wprowadzenie np. płci
                        lub kwartału roku urodzenia dziecka może skutkować nieprawidłowym przypisaniem punktacji, a co
                        za tym idzie nieprawidłową oceną sprawności dziecka.
                    </li>
                    <li>
                        W zakres Usług dla Użytkownika – Instruktora wchodzą w szczególności:
                        <ol type="a">
                            <li>umożliwienie przyporządkowywania uczestników Programu do grup w danych placówkach;</li>
                            <li>
                                umożliwienie wpisywania, edytowania, usuwania wyników z prowadzonych testów sprawności
                                oraz innych pomiarów uczestników Programu;
                            </li>
                            <li>
                                udostępnianie instruktorowi artykułów oraz innych treści eksperckich, publikowanych w
                                Aplikacji;
                            </li>
                            <li>
                                przesyłanie wiadomości, komunikatów, ogłoszeń, i innych informacji związanych z
                                funkcjonowaniem Platformy w tym związane z testami sprawności;
                            </li>
                            <li>
                                usunięcie wcześniej konta, niż zakończenie pracy w Fundacji, na pisemną prośbę przesłaną
                                do Fundacji, pod warunkiem braku podstaw prawnych do dalszego przetwarzania danych
                                osobowych przez Fundację.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Konta Użytkowników - Instruktorów z odpowiednimi uprawnieniami tworzone są przez Administratora
                        Platformy, który przydziela specjalny kod do rejestracji zatrudnionemu w Fundacji Instruktorowi
                        oraz nadaje uprawnienia poprzez wykorzystanie loginu – adresu mailowego instruktora podanego
                        Fundacji do kontaktu.
                    </li>
                    <li>
                        Dostęp do Platformy/Aplikacji ustaje z chwilą:
                        <ol type="a">
                            <li>
                                usunięcia konta Rodzica/ Opiekuna Prawnego w Aplikacji przez Administratora Platformy,
                                co może nastąpić tylko na pisemną prośbę Rodzica/ Opiekuna Prawnego lub przy użyciu
                                wzoru z załącznika nr 1 do regulaminu, wysłanego do Fundacji za pomocą Poczty Polskiej
                                na adres Fundacji zawarty w § 1 lub elektronicznej na adres: fundacja@mali-wspaniali.pl;
                            </li>
                            <li>
                                usunięcia konta Instruktora z chwilą ustania jego pracy w Fundacji lub w sytuacji
                                opisanej w § pkt. 5 e;
                            </li>
                            <li>
                                anonimizacji konta po 5 latach od dnia rejestracji przez Rodzica/ Opiekuna Prawnego, co
                                może nastąpić do roku od zakończenia uczęszczania dziecka do placówki przedszkolnej; a w
                                przypadku dzieci uczęszczających do „zerówek” na terenie placówki po zakończeniu w niej
                                edukacji,
                            </li>
                            <li>złamania zasad zapisanych w § 4; punkt 3 regulaminu.</li>
                        </ol>
                    </li>
                </ol>
            </Typography>
            <Box mb="1rem" />

            <Typography variant="subtitle1" align="center">
                <strong>§4</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>
                    PRAWA, OBOWIĄZKI, ODPOWIEDZIALNOŚĆ FUNDACJI I UŻYTKOWNIKÓW, ZASADY KORZYSTANIA Z PLATFORMY/APLIKACJI
                </strong>
            </Typography>
            <Typography variant="subtitle1">
                <ol>
                    <li>
                        Użytkownik Rodzic ma prawo:
                        <ol type="a">
                            <li>
                                w dowolnym czasie bez konieczności podawania przyczyny zrezygnować z korzystania z
                                Platformy/Aplikacji, w szczególności jeżeli nie akceptuje obowiązującego w danym czasie
                                Regulaminu, którego aktualny tekst jest publikowany na Platformie, w sposób
                                umożliwiający jego odczytanie oraz utrwalenie, przed podjęciem czynności logowania;
                            </li>
                            <li>
                                do rezygnacji z korzystania z Platformy/Aplikacji, co może nastąpić poprzez wysłanie
                                maila do Fundacji z adresu, na którym się rejestrował lub pocztą tradycyjną, o treści z
                                załącznika nr 1 do regulaminu. Fundacja informuje, że rezygnacja powoduje usunięcie z
                                Platformy/Aplikacji konta Rodzica/ Opiekuna Prawnego oraz zgody na uczestnictwo dziecka
                                w Programie Mali Wspaniali a co za tym idzie zgodę na zajęcia w placówce przedszkolnej
                                oraz innych działaniach związanych z realizacją programu, w szczególności testach i
                                pomiarach. Dane dotyczące dziecka zostaną zanonimizowane zgodnie z zapisem w §3 pkt 4i.
                                W przypadku chęci wrócenia do korzystania z Platformy, Użytkownik może zwrócić się do
                                Fundacji o ponowne wygenerowanie kodu i przeprowadzić proces rejestracji ponownie. Aby
                                otrzymać kod aktywacyjny Rodzic musi poinformować Administratora/ Fundację droga pisemną
                                lub mailową o wznowieniu dostępu;
                            </li>
                            <li>
                                kontaktować się celem udostępnienia nowego kodu dostępu w przypadku, gdy przekazany kod
                                utracił ważność, kod traci ważność po 14 dniach;
                            </li>
                            <li>do zmiany danych dostępowych - tylko hasła do swojego konta.</li>
                        </ol>
                    </li>
                    <li>
                        Zabronione jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, naruszających
                        prawo lub dobre obyczaje.
                    </li>
                    <li>
                        Użytkownik nie ma prawa do:
                        <ol type="a">
                            <li>
                                wykorzystywania Platformy/Aplikacji do działań naruszających prawa osób trzecich,
                                działań niezgodnych z obowiązującym prawem lub postanowieniami niniejszego Regulaminu;
                            </li>
                            <li>
                                wykorzystywania wewnętrznej możliwości, jaką daje Platforma/Aplikacja, do wysyłania
                                wiadomości celem rozpowszechniania treści: reklamowych, handlowych lub marketingowych,
                                bezprawnych, obraźliwych, propagujących przemoc, mających charakter dyskryminacyjny,
                                rasistowski lub naruszających powszechnie uznane dobre obyczaje, czy rozpowszechniania
                                spamu;
                            </li>
                            <li>
                                Użytkownik zobowiązany jest powstrzymać się od wszystkich działań mogących utrudnić
                                dostęp do Platformy innym Użytkownikom oraz działań zakłócających lub uniemożliwiających
                                funkcjonowanie Aplikacji/ Platformy.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Naruszenie przez Użytkownika zakazu dostarczania treści bezprawnych, o którym mowa w ust. 2, lub
                        naruszenie przez Użytkownika postanowienia ust. 3 powyżej stanowi podstawę do zgłoszenia
                        naruszeń odpowiednim organom oraz usunięcia konta Użytkownika.
                    </li>
                    <li>
                        W granicach, w jakich jest to dopuszczalne, zgodnie z powszechnie obowiązującymi przepisami
                        prawa Fundacja nie ponosi odpowiedzialności za:
                        <ol type="a">
                            <li>
                                skutki wynikłe z przejęcia danych dostępowych użytkownika (login, hasło) do
                                Platformy/Aplikacji przez osobę trzecią, jeżeli przejęcie to nastąpiło z przyczyny przez
                                Fundację niezawinionej;
                            </li>
                            <li>
                                bezprawne działania osób trzecich polegające na ingerencji w system komputerowy
                                Użytkownika, w szczególności włamania i wirusy komputerowe, Fundacja nie ponosi winy za
                                takie działania;
                            </li>
                            <li>
                                treści wiadomości wysyłanych przez Użytkowników na zasadach określonych w powszechnie
                                obowiązujących przepisach prawa;
                            </li>
                            <li>
                                szkody Użytkownika powstałe w wyniku uniemożliwienia dostępu do danych, na zasadach
                                określonych w powszechnie obowiązujących przepisach prawa;
                            </li>
                            <li>
                                treść, prawidłowość i kompletność danych wprowadzanych do Platformy przez Użytkowników;
                                w szczególności danych dzieci uczestniczących w programie zajęć Mali Wspaniali;
                            </li>
                            <li>
                                zaprzestanie świadczenia Usługi z powodu wypowiedzenia lub rozwiązania umowy łączącej
                                przedszkole, operatora lub instytucję nadzorująca placówki edukacyjne oraz Fundację.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Fundacja zastrzega sobie prawo do:
                        <ol type="a">
                            <li>
                                udoskonalania Platformy/Aplikacji w tym jej upraszczania, rozszerzania, modyfikowania a
                                także zmiany funkcjonalności, w szczególności w celu dostosowania do zasad prowadzenia
                                Programu oraz w szczególności obowiązujących przepisów prawa i bezpieczeństwa;
                            </li>
                            <li>
                                usunięcia konta dowolnego Użytkownika w przypadku uzasadnionego podejrzenia jego
                                wykorzystywania wbrew postanowieniom Regulaminu, w szczególności §4 ust. 2 i ust. 3
                                niniejszego Regulaminu lub uzasadnionego podejrzenia nieautoryzowanej próby dostępu do
                                danych. Przed usunięciem konta Fundacja skontaktuje się z Użytkownikiem celem
                                wyjaśnienia podejrzeń oraz poinformowania o dalszych, ewentualnych krokach, w tym
                                zgłoszenia odpowiednim organom;
                            </li>
                            <li>
                                udostępniania danych zgromadzonych w Aplikacji dotyczących statystyki wyników testów
                                sprawności oraz innych pomiarów dzieci uprawnionym podmiotom na podstawie powszechnie
                                obowiązujących przepisów prawa;
                            </li>
                            <li>
                                wyłączenia Platformy na czas niezbędny do prawidłowej realizacji czynności
                                administracyjnych związanych z należytym zabezpieczeniem, archiwizacją i ochroną
                                zgromadzonych danych;
                            </li>
                            <li>
                                Fundacja ma prawo przechowywać zanonimizowane dane do celów archiwizacji, statystycznych
                                oraz przedawnienia roszczeń;
                            </li>
                            <li>
                                przetwarzania danych osobowych Użytkowników w zakresie niezbędnym do udostępnienia
                                wyników pomiarów dzieci, wysyłania informacji do Rodziców/ Opiekunów Prawnych
                                dotyczących funkcjonowania Platformy oraz innych treści adekwatnie do podpisanych zgód;
                            </li>
                            <li>
                                anonimizacji i przenoszenia do archiwum niektórych danych z Platformy/Aplikacji po
                                zakończeniu każdego roku szkolnego, w szczególności wyników prób z testów sprawności
                                dzieci biorących udział w pomiarach, celem przygotowania analiz statystycznych/
                                naukowych;
                            </li>
                            <li>
                                weryfikacji liczby kont uczniów wprowadzonych przez uprawnionych Użytkowników do
                                Platformy/Aplikacji w stosunku do tej, zadeklarowanej przez Przedszkole;
                            </li>
                            <li>
                                Fundacja nie gwarantuje ciągłej dostępności Platformy/Aplikacji, Usług. Użytkownik musi
                                się liczyć z przerwami w dostępie do Platformy i Usług, w szczególności związanymi z
                                koniecznością wprowadzania zmian, lub konserwacji. Fundacja dołoży starań aby przerwy
                                były jak najkrótsze.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Fundacja zastrzega sobie prawo do zmiany Regulaminu. Za ważne przyczyny uznaje się:
                        <ol type="a">
                            <li>
                                wprowadzenie nowych lub zmianę istniejących powszechnie obowiązujących przepisów prawa,
                                jeżeli ma to bezpośredni wpływ na treść Regulaminu i powoduje konieczność jego zmiany;
                            </li>
                            <li>
                                zmiany lub pojawienie się nowych interpretacji powszechnie obowiązujących przepisów
                                prawa na skutek orzeczeń sądów lub decyzji organów władzy lub administracji publicznej
                                wpływających bezpośrednio na postanowienia niniejszego Regulaminu i powodujących
                                konieczność jego zmiany lub udoskonalenie produktów i usług, w tym dostosowanie do
                                warunków rynkowych związanych z postępem technicznym, technologicznym i informatycznym,
                                wpływających na postanowienia niniejszego Regulaminu;
                            </li>
                            <li>dostosowanie produktów i usług do grup odbiorców programu Mali Wspaniali;</li>
                            <li>
                                rozszerzenie lub zmianę funkcjonalności istniejących produktów i usług wpływającą na
                                zmianę treści niniejszego Regulaminu.
                            </li>
                        </ol>
                    </li>
                    <li>
                        O treści zmian Regulaminu każdy Użytkownik zostanie uprzednio poinformowany za pomocą wiadomości
                        publikowanej przez administratora platformy wysłanej Użytkownikom, zawierającej link do jego
                        zmienionej wersji. Nowa wersja Regulaminu wiąże Użytkownika, jeśli w terminie 14 dni od daty
                        otrzymania informacji o zmianie Użytkownik nie zrezygnuje z korzystania z Platformy/Aplikacji w
                        sposób wskazany w §4 ust.
                    </li>
                    <li>
                        Reklamacje Użytkownika dotyczące dostępności Platformy, należy składać pisemnie na adres
                        Fundacji wskazany w § 1 niniejszego Regulaminu lub drogą elektroniczną z wykorzystaniem
                        Platformy/Aplikacji poczty wewnętrznej dostępnej w Platformie. W przypadku reklamacji Fundacja
                        udziela odpowiedzi w formie pisemnej (pocztą tradycyjną lub drogą elektroniczną), w terminie do
                        30 dni od dnia jej złożenia, na adres (w tym mailowy) wskazany w piśmie reklamacyjnym.
                    </li>
                </ol>
            </Typography>

            <Typography variant="subtitle1" align="center">
                <strong>§5</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>PRZETWARZANIE DANYCH OSOBOWYCH </strong>
            </Typography>
            <Typography variant="subtitle1">
                <ol>
                    <li>
                        Administratorem danych przetwarzanych w Aplikacji zgodnie z rozporządzeniem Parlamentu
                        Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych
                        w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz
                        uchylenia dyrektywy 95/46/WE (dalej: RODO) jest Fundacja.{' '}
                    </li>
                    <li>
                        Administrator danych zapewnia odpowiednie środki techniczne i organizacyjne zapewniające
                        bezpieczeństwo danych osobowych udostępnionych przez Użytkowników, w szczególności
                        uniemożliwiające dostęp do nich osobom trzecim lub ich przetwarzanie z naruszeniem przepisów
                        prawa, zapobiegające utracie danych, ich uszkodzeniu lub zniszczeniu.{' '}
                    </li>
                    <li>
                        We wszelkich sprawach związanych z przetwarzaniem danych osobowych Użytkownika można kontaktować
                        się z Administratorem danych pod adresem: fundacja@mali-wspaniali.pl.
                    </li>
                    <li>
                        Fundacja przetwarza dane osobowe Użytkownika zgodnie z:
                        <ol type="a">
                            <li>
                                art. 6 ust. 1 lit. b) RODO - przetwarzanie jest niezbędne do wykonania umowy, której
                                stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której
                                dane dotyczą, przed zawarciem umowy. Umowa o świadczenie usług drogą elektroniczną w
                                odniesieniu do korzystania z Platformy zawierana jest przez Użytkownika z
                                Administratorem na warunkach przewidzianych niniejszym Regulaminem;
                            </li>
                            <li>
                                art. 6 ust. 1 lit. e) RODO - przetwarzanie jest niezbędne do wykonania zadania
                                realizowanego w interesie publicznym. Przez zadania realizowane w interesie publicznym
                                rozumie się zadania o charakterze użyteczności publicznej, takie jak m.in. wspieranie
                                programów edukacyjnych dla dzieci w szkołach i przedszkolach;
                            </li>
                            <li>
                                art. 6 ust. 1 lit. f) RODO - przetwarzanie jest niezbędne do celów wynikających z
                                prawnie uzasadnionych interesów realizowanych przez administratora, np. w postaci
                                dochodzenia roszczeń, umożliwienia kontaktu.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Podstawą prawną przetwarzania danych szczególnych kategorii powstałych w wyniku opracowanie
                        wyników testów sprawności fizycznej dziecka/ci, tj. sprawność, szybkość, siła, zwinność jest
                        art. 9 ust. 2 lit. d) RODO - przetwarzania dokonuje się w ramach uprawnionej działalności
                        prowadzonej z zachowaniem odpowiednich zabezpieczeń przez Fundację, stowarzyszenie lub inny
                        niezarobkowy podmiot o celach politycznych, światopoglądowych, religijnych lub związkowych.
                    </li>
                    <li>
                        Podstawą prawną przetwarzania wizerunku dziecka/ci w celach promocyjnych i/lub adresu e-mail
                        Rodzica/ Opiekuna Prawnego/opiekuna prawnego w celach marketingowych jest art. 6 ust. 1 lit a)
                        RODO – zgoda na przetwarzanie danych osobowych, tzn. że dane te mogą być przetwarzane przez
                        Fundację jedynie w przypadku wyrażenia przez Rodzica/ Opiekuna Prawnego/opiekuna prawnego zgody
                        na takie działanie.
                    </li>
                    <li>
                        Dane osobowe nie będą udostępniane podmiotom trzecim, chyba że dzieje się to w przypadku:
                        <ol type="a">
                            <li>wyraźnej zgody użytkownika;</li>
                            <li>przekazania danych uprawnionym organom na podstawie przepisów prawa.</li>
                        </ol>
                    </li>
                    <li>
                        Ponadto w niektórych sytuacjach Administrator ma prawo przekazywać dane, jeśli będzie to
                        konieczne, aby móc realizować zadania spoczywające na Fundacji. Dane będą przekazywane wyłącznie
                        dwóm grupom:
                        <ol type="a">
                            <li>
                                osobom upoważnionym przez Fundację, tj. pracownikom i współpracownikom Fundacji, którzy
                                muszą mieć dostęp do tych danych, aby wykonywać swoje obowiązki;
                            </li>
                            <li>
                                podmiotowi przetwarzającemu, któremu Fundacja zleciła czynności wymagające przetwarzania
                                danych, tj. twórcy i administratorowi Platformy/Aplikacji zarządzania i komunikacji
                                Platformy dla Programu Mali Wspaniali oraz firmie świadczącej usługi e-mail marketingu;
                            </li>
                            <li>uprawnionym organom państwowym (np.: policja, sąd).</li>
                        </ol>
                    </li>
                    <li>
                        Dane osobowe Użytkownika przetwarzane będą:
                        <ol type="a">
                            <li>
                                w przypadku świadczenia usług elektronicznych mających na celu umożliwienie utworzenia
                                konta oraz korzystania z funkcjonalności Aplikacji/ Platformy – przez okres istnienia
                                konta w ramach usług, następnie przez okres wymagany przepisami prawa i/lub do upływu
                                terminu przedawnienia ewentualnych roszczeń, tj. przez okres 5 lat, po tym czasie dane
                                osobowe będą zanonimizowane i w takiej formie przechowywane do celów statystycznych i
                                archiwalnych;
                            </li>
                            <li>
                                w przypadku przesyłania informacji marketingowych – do momentu zgłoszenia przez
                                Użytkownika sprzeciwu bądź wycofania zgody na przetwarzanie danych w celach związanych z
                                marketingiem lub do czasu zaprzestania działalności z zakresu marketingu bezpośredniego
                                przez Fundację;
                            </li>
                            <li>
                                w przypadku przetwarzania wizerunku dziecka w celach promocyjnych – do czasu wycofania
                                zgody.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Użytkownik w każdej chwili ma prawo do wycofania zgody na przetwarzanie swoich danych osobowych
                        w celach marketingowych (bądź w przypadku Rodziców/opiekunów prawnych - danych osobowych swojego
                        dziecka/podopiecznego w postaci wizerunku w celach promocyjnych). Cofnięcie zgody ma skutek od
                        momentu wycofania zgody. Cofnięcie zgody nie wpływa na przetwarzanie dokonywane przez
                        Administratora zgodnie z prawem przed jej cofnięciem. Cofnięcie zgody nie pociąga za sobą̨ dla
                        Użytkownika żadnych negatywnych konsekwencji. Może jednak uniemożliwić dalsze korzystanie z
                        usług lub funkcjonalności, które zgodnie z prawem Administrator danych może świadczyć jedynie za
                        zgodą.
                    </li>
                    <li>
                        Użytkownikowi przysługuje prawo żądania dostępu do treści swoich danych osobowych oraz prawo ich
                        sprostowania. W przypadku określonych przepisami prawa Użytkownikowi przysługuje prawo żądania
                        usunięcia danych osobowych, żądania ograniczenia przetwarzania danych osobowych, prawo do
                        przeniesienia danych osobowych, prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych.
                        Użytkownikowi przysługuje również prawo wniesienia skargi do organu nadzoru zajmującego się
                        ochroną danych osobowych, gdy uzna, że Administrator danych (Fundacja) naruszył przepisy
                        dotyczące ochrony danych osobowych.
                    </li>
                    <li>
                        Z uwagi na fakt, że dane osobowe, tj. imię i nazwisko, adres e-mail będą przetwarzane przez
                        Administratora do celów wynikających z prawnie uzasadnionego interesu Administratora,
                        Użytkownikowi przysługuje prawo do wniesienia sprzeciwu wobec przetwarzania danych osobowych w
                        w/w celu z przyczyn związanych ze szczególną sytuacją Użytkownika.
                    </li>
                    <li>
                        Wszelkie zgłoszenia dotyczące danych osobowych Użytkownika powinny być zgłaszane bezpośrednio
                        przez Użytkownika na adres e-mail: fundacja@mali-wspaniali.pl.
                    </li>
                    <li>
                        Podanie danych osobowych nie jest obowiązkowe jednak jest niezbędne do korzystania z Platformy.
                    </li>
                    <li>
                        Zgoda na wykorzystanie wizerunku dziecka/ci jak również zgoda na działania marketingowe nie jest
                        obowiązkowa i nie skutkuje ona brakiem możliwości korzystania z Platformy.
                    </li>
                    <li>
                        Wszelkie pozostałe informacje w zakresie przetwarzania danych przez Administratora danych
                        osobowych za pośrednictwem Aplikacji/Platformy zostały szczegółowo wskazane w Polityce
                        prywatności.
                    </li>
                </ol>
            </Typography>

            <Typography variant="subtitle1" align="center">
                <strong>§6</strong>
            </Typography>
            <Typography variant="subtitle1" align="center">
                <strong>POZOSTAŁE INFORMACJE</strong>
            </Typography>
            <Typography variant="subtitle1">
                <ol>
                    <li>
                        Fundacja informuje, że pod adresem URL:
                        https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=PL dostępna jest
                        platforma internetowego Platformy/Aplikacji rozstrzygania sporów dotyczących zobowiązań umownych
                        wynikających z internetowych umów sprzedaży lub umów o świadczenie usług pomiędzy konsumentami
                        zamieszkałymi w Unii Europejskiej a przedsiębiorcami mającymi siedzibę w Unii Europejskiej
                        (platforma ODR).
                    </li>
                    <li>
                        Fundacja informuje, że nie korzysta z alternatywnych metod rozstrzygania sporów (pozasądowych
                        sposobów rozpatrywania reklamacji i dochodzenia roszczeń) i nie zobowiązuje się do korzystania z
                        takich metod, o ile obowiązek taki nie wynika z bezwzględnie obowiązującego przepisu prawa.
                    </li>
                    <li>
                        Fundacja informuje, że Użytkownik będący konsumentem może uzyskać bezpłatną pomoc w sprawie
                        rozstrzygnięcia sporu między takim Użytkownikiem a Fundacją, zwracając się do powiatowego
                        (miejskiego) rzecznika konsumentów lub organizacji społecznej, do której zadań statutowych
                        należy ochrona konsumentów (m.in. Federacja Konsumentów, Stowarzyszenie Konsumentów Polskich).
                    </li>
                </ol>
            </Typography>
            <Box mb="2rem" />

            <Typography variant="subtitle1" align="center">
                <strong>ZAŁĄCZNIK NR 1 DO REGULAMINU</strong>
            </Typography>
            <Box mb="1rem" />
            <Link
                underline="always"
                color="textPrimary"
                href={t('registration-page.agreements.resignation-link')}
                target="_blank"
            >
                <Box display="flex" flexDirection="row">
                    <DownloadIcon />
                    <Box mr={2} />
                    <Typography variant="subtitle1">{t('registration-page.agreements.resignation-label')}</Typography>
                </Box>
            </Link>
            <Box mb="2rem" />
        </Box>
    );
};
