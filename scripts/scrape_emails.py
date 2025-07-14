import requests
from bs4 import BeautifulSoup
import csv

def scrape_vc_emails():
    url = "https://example-venture-capitals.com"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    emails = set()
    for link in soup.find_all('a', href=True):
        if "mailto:" in link['href']:
            email = link['href'].split('mailto:')[1]
            emails.add(email)

    return emails

if __name__ == "__main__":
    emails = scrape_vc_emails()

    with open('vc_emails.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Email'])
        for email in emails:
            writer.writerow([email])

    print("Scraping completed. Emails saved to vc_emails.csv.")

