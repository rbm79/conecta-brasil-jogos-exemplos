using UnityEngine;

public class BallSpawner : MonoBehaviour
{
    public GameObject ballPrefab;
    public float spawnInterval = 1.5f;
    public float spawnRange = 8f;

    void Start()
    {
        InvokeRepeating(nameof(SpawnBall), 1f, spawnInterval);
    }

    void SpawnBall()
    {
        float randomX = Random.Range(-spawnRange, spawnRange);
        Vector3 spawnPos = new Vector3(randomX, transform.position.y, 0);
        Instantiate(ballPrefab, spawnPos, Quaternion.identity);
    }
}
