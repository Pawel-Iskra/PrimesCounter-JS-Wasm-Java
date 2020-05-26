import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/primes")
public class Primes extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/primes.html");
        requestDispatcher.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int n = Integer.parseInt(req.getParameter("n"));

        int counter = 0;
        long start = System.nanoTime();
        for (int i = 2; i <= n; i++) if (isPrime(i)) counter++;
        long end = System.nanoTime();
        int time = (int) Math.round((end - start) * 1.0 / 1000000);

        resp.getWriter().println(time);
    }

    private boolean isPrime(int x) {
        if (x % 2 == 0) return x == 2;
        int sqrt = (int) Math.sqrt(x) + 1;
        for (int i = 3; i < sqrt; i = i + 2) if (x % i == 0) return false;
        return true;
    }
}
