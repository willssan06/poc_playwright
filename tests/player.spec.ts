import { test, expect } from '@playwright/test';
import { title } from 'process';

test('deve tocar uma música', async ({ page }) => {
  const song = {
    id: 1,
    title: "Bughium",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  }

  // interceptar a chamada da API

  await page.route('**/songs', route => route.fulfill({
    status:200,
    body: JSON.stringify([song])
  }))
  
  await page.goto('/');

  const loggedUser = page.locator('.logged-user')
  await expect(loggedUser).toHaveText('Fernando Papito');

  const songCard = page.locator('.song').filter({hasText:song.title})
  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')
  await play.click()
  await expect(pause).toBeVisible({timeout:2000})
  await expect(play).toBeVisible({timeout:7000})

});
