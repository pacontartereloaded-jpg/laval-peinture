from playwright.sync_api import sync_playwright

cards = [
    {
        'html':  'E:/Laval Peinture/public/business-card.html',
        'front': 'E:/Laval Peinture/public/card-front.png',
        'back':  'E:/Laval Peinture/public/card-back.png',
    },
    {
        'html':  'E:/Peinture Repentigny/public/business-card.html',
        'front': 'E:/Peinture Repentigny/public/card-front.png',
        'back':  'E:/Peinture Repentigny/public/card-back.png',
    },
    {
        'html':  'E:/Peinture Terrebonne/public/business-card.html',
        'front': 'E:/Peinture Terrebonne/public/card-front.png',
        'back':  'E:/Peinture Terrebonne/public/card-back.png',
    },
    {
        'html':  'E:/PEINTURE NOZA/business-card.html',
        'front': 'E:/PEINTURE NOZA/card-front.png',
        'back':  'E:/PEINTURE NOZA/card-back.png',
    },
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for card in cards:
        url = 'file:///' + card['html'].replace('\\', '/')
        page = browser.new_page(viewport={'width': 900, 'height': 1100})
        page.goto(url)
        page.wait_for_timeout(2000)
        page.locator('.card-front').first.screenshot(path=card['front'])
        page.locator('.card-back').first.screenshot(path=card['back'])
        print('OK:', card['html'])
    browser.close()

print('Todos los screenshots listos!')
