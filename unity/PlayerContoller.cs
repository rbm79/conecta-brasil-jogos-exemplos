using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerController : MonoBehaviour
{
    public GameObject gameOverText;
    public GameObject retryButton;
    public float moveSpeed = 5f;

    void Update()
    {
        float inputX = Input.GetAxis("Horizontal");
        transform.Translate(Vector2.right * inputX * moveSpeed * Time.deltaTime);
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Bola"))
        {
            Debug.Log("Game Over!");
            Time.timeScale = 0f; // Pausa o jogo
            gameOverText.SetActive(true);
            retryButton.SetActive(true);
        }
    }
    
    public void RetryGame()
    {
        Time.timeScale = 1f; // Despausa o jogo
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex); // Recarrega a cena
    }

}
